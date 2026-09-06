const pino = require("pino");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const SESSION_DIR = path.join(__dirname, "my-sess");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = q => new Promise(resolve => rl.question(q, resolve));

async function main() {
  try {
    const {
      default: makeWASocket,
      useMultiFileAuthState,
      fetchLatestBaileysVersion
    } = await import("@whiskeysockets/baileys");

    // Create a fresh session directory
    fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    fs.mkdirSync(SESSION_DIR, { recursive: true });

    const { state, saveCreds } =
      await useMultiFileAuthState(SESSION_DIR);

    const { version } = await fetchLatestBaileysVersion();

    console.log("WhatsApp version:", version.join("."));

    const sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      browser: ["BONY-XMD", "Chrome", "1.0.0"],
      printQRInTerminal: false,
      generateHighQualityLinkPreview: false,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 25000
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async update => {
      const {
        connection,
        lastDisconnect
      } = update;

      if (connection) {
        console.log("Connection:", connection);
      }

      if (lastDisconnect) {
        console.log(
          "❌ Disconnect details:",
          lastDisconnect.error?.output ||
          lastDisconnect.error ||
          lastDisconnect
        );
      }

      if (connection === "open") {
        console.log("✅ WhatsApp connected!");

        await new Promise(r => setTimeout(r, 3000));

        const files = fs.readdirSync(SESSION_DIR);
        const sessionData = {};

        for (const file of files) {
          const filePath = path.join(SESSION_DIR, file);

          if (fs.statSync(filePath).isFile()) {
            sessionData[file] =
              fs.readFileSync(filePath, "utf8");
          }
        }

        const sessionId = Buffer
          .from(JSON.stringify(sessionData))
          .toString("base64");

        fs.writeFileSync("session.txt", sessionId);

        console.log("\n================================");
        console.log("✅ SESSION_ID GENERATED");
        console.log("================================");
        console.log("Saved to: session.txt");
        console.log("Run: cat session.txt");

        rl.close();
        process.exit(0);
      }
    });

    const number = await ask(
      "Enter WhatsApp number with country code (2547XXXXXXXX): "
    );

    const cleanNumber = number.replace(/\D/g, "");

    if (!/^2547\d{8}$/.test(cleanNumber)) {
      console.log("❌ Invalid number format.");
      rl.close();
      return;
    }

    console.log("⏳ Requesting pairing code...");

    await new Promise(r => setTimeout(r, 2000));

    const code = await sock.requestPairingCode(cleanNumber);

    console.log("\n================================");
    console.log("🔑 YOUR PAIRING CODE:");
    console.log(code);
    console.log("================================\n");

    console.log(
      "WhatsApp → Settings → Linked Devices → Link a device → Link with phone number"
    );

    console.log("\n⏳ Waiting for login...");
  } catch (error) {
    console.log("❌ ERROR:", error);
    rl.close();
  }
}

main();
