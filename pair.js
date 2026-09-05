const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
async function pair() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }), browser: ['Chrome','Chrome','1.0'], printQRInTerminal: false })
  sock.ev.on('creds.update', saveCreds)
  if(!fs.existsSync('./session/creds.json')) {
    console.log('Enter your number with country code, e.g 2547xxxx:')
    process.stdin.on('data', async (d) => {
      const num = d.toString().trim().replace(/[^0-9]/g,'')
      if(num) {
        setTimeout(async () => {
          const code = await sock.requestPairingCode(num)
          console.log('\n🔥 YOUR PAIR CODE:', code, '\nGo to WhatsApp > Linked Devices > Link with code')
        }, 2000)
      }
    })
  } else {
    console.log('Already linked! creds.json exists')
  }
  sock.ev.on('connection.update', (u) => {
    if(u.connection === 'open') console.log('✅ Linked success! Now run: cat session/creds.json | base64 -w 0')
  })
}
pair()
