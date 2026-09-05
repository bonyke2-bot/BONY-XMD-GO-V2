const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (t) => new Promise(r => rl.question(t, r))
async function gen() {
 const { state, saveCreds } = await useMultiFileAuthState('session')
 const sock = makeWASocket({ auth: state, logger: P({level:'silent'}), browser: ["Ubuntu","Chrome","20.0"] })
 sock.ev.on('creds.update', saveCreds)
 await new Promise(r=>setTimeout(r,3000))
 console.log("\n--- BONY-XMD PAIR GENERATOR ---")
 let num = await ask("Enter number with country code (245...): ")
 num = num.replace(/[^0-9]/g,'')
 if(!num) { console.log("Invalid number"); process.exit() }
 try {
   const code = await sock.requestPairingCode(num)
   console.log("\n=================================")
   console.log(" YOUR CODE: " + code)
   console.log("=================================")
   console.log("\n1. WhatsApp > Linked Devices")
   console.log("2. Link with phone number")
   console.log("3. Enter: " + code)
 } catch(e){ console.log("Error:", e.message, "\nMake sure number has WhatsApp and not already linked") }
}
gen()
