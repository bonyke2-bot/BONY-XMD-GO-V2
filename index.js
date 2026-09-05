const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const express = require('express')
const app = express()

// Keep Heroku alive - fixes H27 error
app.get('/', (req,res) => res.send('BONY-XMD GO V2 ACTIVE 🔥'))
app.listen(process.env.PORT || 3000)

async function startBot() {
 const { state, saveCreds } = await useMultiFileAuthState('./session')
 const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }), browser: ['BONY XMD GO','Chrome','1.0.0'] })
 sock.ev.on('creds.update', saveCreds)
 sock.ev.on('connection.update', async (up) => {
  const { connection } = up
  if(connection === 'open') console.log('\n✅ BONY-XMD GO V2 Connected! Bot ACTIVE 🔥')
  if(connection === 'close') setTimeout(startBot, 3000)
 })
}
startBot()
