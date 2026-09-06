const { makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q, r))

async function pair() {
  let num = await ask("Enter WhatsApp number with country code (e.g 2547...): ")
  num = num.replace(/[^0-9]/g, '')
  console.log("Using number:", num)
  rl.close()
  
  const { version } = await fetchLatestBaileysVersion()
  console.log("WA Version:", version)
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({level: "silent"}),
    browser: ["Ubuntu", "Chrome", "110.0.5585.95"],
    printQRInTerminal: false
  })
  sock.ev.on("creds.update", saveCreds)
  
  await delay(4000)
  if(!sock.authState.creds.registered) {
    try {
      const code = await sock.requestPairingCode(num)
      console.log("\n=====================")
      console.log("🔑 CODE FOR "+num+": " + code)
      console.log("=====================\n")
      console.log("Go WhatsApp > Linked Devices > Link with phone number > Enter CODE fast!")
    } catch(e) {
      console.log("Pair error:", e.message)
    }
  }
  
  sock.ev.on("connection.update", async (u) => {
    console.log("Status:", u.connection)
    if(u.connection === "open") {
      console.log("✅ LOGGED IN!")
      await delay(3000)
      const creds = fs.readFileSync('./auth_info_baileys/creds.json', 'utf-8')
      const b64 = Buffer.from(creds).toString('base64')
      fs.writeFileSync('session.txt', b64)
      console.log("\n✅ SESSION_ID:\n", b64.substring(0,300))
      console.log("\nFull session in session.txt -> run cat session.txt")
      process.exit(0)
    }
  })
}
pair()
