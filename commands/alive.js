module.exports = {
 name: "alive",
 desc: "Bot alive check",
 async exec(m, sock) {
   await sock.sendMessage(m.chat, {text: `*BONY-XMD V2 IS ALIVE!* 🔥\n\n> Bot is running smooth\n> Owner: Bonyke\n> Mode: Public`})
 }
}
