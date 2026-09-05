const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qr = require('qrcode-terminal');
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ['BONY XMD GO', 'Chrome', '1.0.0']
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (up) => {
    const { connection, qr: qrCode } = up;
    if (qrCode) {
      console.log('\n==== SCAN THIS QR ====\n');
      qr.generate(qrCode, { small: true });
    }
    if (connection === 'open') console.log('\n✅ BONY-XMD GO V2 Connected!');
    if (connection === 'close') {
      console.log('Closed, retry 3s');
      setTimeout(startBot, 3000);
    }
  });
}
startBot();
