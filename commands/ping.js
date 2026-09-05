module.exports = {
 name: "ping",
 desc: "Check bot speed",
 async exec(m, sock) {
   const start = Date.now()
   await sock.sendMessage(m.chat, {text: "_Pinging..._"})
   const end = Date.now()
   await sock.sendMessage(m.chat, {text: `*Pong!* ⚡ ${end-start}ms\n\n*BONY-XMD V2*`})
 }
}
