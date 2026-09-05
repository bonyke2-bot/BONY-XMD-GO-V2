const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs-extra');
const config = require('./config');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  
  const sock = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'}))
    },
    logger: pino({level: 'silent'}),
    printQRInTerminal: false,
    browser: [config.BOT_NAME, 'Chrome', config.VERSION]
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log(`✅ ${config.BOT_NAME} Connected Successfully!`);
      
      // Send startup message to owner
      const botInfo = `
*${config.BOT_NAME} v${config.VERSION}*
*BOT INFORMATION*

BOT NAME: ${config.BOT_NAME}
DEVELOPER: ${config.OWNER_NAME}
PLATFORM: WhatsApp
MODE: ${config.MODE}

${config.FOOTER}
      `;
      console.log(botInfo);
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;
    
    const from = m.key.remoteJid;
    const body = m.message.conversation || m.message.extendedTextMessage?.text || "";
    
    if (!body.startsWith(config.PREFIX)) return;
    
    const args = body.slice(config.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // MENU COMMAND
    if (command === 'menu' || command === 'help') {
      const menu = `
╭─── *${config.BOT_NAME}* ───
│ Version: ${config.VERSION}
│ Developer: ${config.OWNER_NAME}
╰────────────────

*BOT INFORMATION*
Bot Name: ${config.BOT_NAME}
Developer: ${config.OWNER_NAME}
Platform: WhatsApp
Mode: ${config.MODE}

*COMMANDS*
${config.PREFIX}menu - Show menu
${config.PREFIX}ping - Check speed
${config.PREFIX}owner - Owner info

${config.FOOTER}
      `;
      await sock.sendMessage(from, { text: menu });
    }

    if (command === 'ping') {
      await sock.sendMessage(from, { text: `*${config.BOT_NAME}* Speed: Fast ⚡\n${config.FOOTER}` });
    }
  });
}

startBot();
