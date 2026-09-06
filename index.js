const express = require("express");
const fs = require("fs");
const path = require("path");
const pino = require("pino");

const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    bot: config.BOT_NAME,
    version: config.VERSION
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🌐 WEB SERVER RUNNING ON PORT ${PORT}`);
});

let makeWASocket;
let useMultiFileAuthState;
let DisconnectReason;

async function loadBaileys() {
  const baileys = await import("@whiskeysockets/baileys");

  makeWASocket = baileys.default;
  useMultiFileAuthState = baileys.useMultiFileAuthState;
  DisconnectReason = baileys.DisconnectReason;
}

const commands = new Map();
const commandsDir = path.join(__dirname, "commands");

function loadCommands() {
  commands.clear();

  if (!fs.existsSync(commandsDir)) {
    console.log("⚠️ commands folder not found");
    return;
  }

  const files = fs.readdirSync(commandsDir)
    .filter(file => file.endsWith(".js"));

  for (const file of files) {
    try {
      const command = require(path.join(commandsDir, file));

      if (!command.name || typeof command.exec !== "function") {
        console.log(`⚠️ Skipped invalid command: ${file}`);
        continue;
      }

      commands.set(command.name.toLowerCase(), command);

      console.log(`✅ Loaded command: ${command.name}`);
    } catch (error) {
      console.log(`❌ Failed to load ${file}: ${error.message}`);
    }
  }

  console.log(`📦 TOTAL COMMANDS LOADED: ${commands.size}`);
}

async function restoreSession() {
  const sessionId = process.env.SESSION_ID;

  if (!sessionId) {
    console.log("⚠️ SESSION_ID not found.");
    console.log("Use get-session.js to create a session.");
    return;
  }

  try {
    const decoded = Buffer
      .from(sessionId, "base64")
      .toString("utf8");

    const sessionData = JSON.parse(decoded);

    const sessionDir = path.join(__dirname, "session");

    fs.mkdirSync(sessionDir, { recursive: true });

    for (const [file, content] of Object.entries(sessionData)) {
      fs.writeFileSync(
        path.join(sessionDir, file),
        content,
        "utf8"
      );
    }

    console.log("✅ SESSION_ID restored successfully.");
  } catch (error) {
    console.log("❌ SESSION restore error:", error.message);
  }
}

function getText(message) {
  if (!message) return "";

  return (
    message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    message.documentMessage?.caption ||
    ""
  );
}

async function startBot() {
  try {
    await loadBaileys();

    await restoreSession();

    const sessionDir = path.join(__dirname, "session");

    const { state, saveCreds } =
      await useMultiFileAuthState(sessionDir);

    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: "silent" }),
      browser: ["BONY-XMD", "Chrome", "1.0.0"],
      printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const m = messages[0];

        if (!m || !m.message) return;
        if (m.key.fromMe) return;

        const chat = m.key.remoteJid;

        if (!chat) return;

        const text = getText(m.message).trim();

        if (!text.startsWith(config.PREFIX)) return;

        const withoutPrefix =
          text.slice(config.PREFIX.length).trim();

        if (!withoutPrefix) return;

        const parts = withoutPrefix.split(/\s+/);

        const commandName =
          parts.shift().toLowerCase();

        const args = parts;

        const command =
          commands.get(commandName);

        if (!command) return;

        const message = {
          ...m,
          chat,
          text,
          body: text,
          args,
          command: commandName,
          isGroup: chat.endsWith("@g.us"),
          sender: m.key.participant || m.key.remoteJid
        };

        await command.exec(message, sock);

      } catch (error) {
        console.log(
          "❌ COMMAND ERROR:",
          error.message
        );
      }
    });

    sock.ev.on(
      "connection.update",
      ({ connection, lastDisconnect }) => {

        if (connection === "connecting") {
          console.log(
            "🔄 Connecting to WhatsApp..."
          );
        }

        if (connection === "open") {
          console.log(
            "✅ BONY-XMD GO V2 CONNECTED!"
          );
        }

        if (connection === "close") {

          const statusCode =
            lastDisconnect?.error?.output?.statusCode;

          console.log(
            "❌ WhatsApp connection closed:",
            statusCode
          );

          if (
            statusCode !==
            DisconnectReason.loggedOut
          ) {

            console.log(
              "🔄 Reconnecting in 5 seconds..."
            );

            setTimeout(() => {
              startBot();
            }, 5000);

          } else {

            console.log(
              "🚪 WhatsApp session logged out."
            );

            console.log(
              "Generate a new SESSION_ID."
            );
          }
        }
      }
    );

  } catch (error) {

    console.log(
      "❌ BOT START ERROR:",
      error.message
    );

    setTimeout(() => {
      startBot();
    }, 5000);
  }
}

loadCommands();
startBot();
