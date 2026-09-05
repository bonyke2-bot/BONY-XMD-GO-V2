module.exports = {
 name: "status",
 desc: "Bot status",
 async exec(m, sock) {
   const up = Math.floor(process.uptime()/60)
   const used = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
   await sock.sendMessage(m.chat, {text: `*BONY-XMD-GO-V2 STATUS*\n\n⏱️ Uptime: ${up} mins\n💾 RAM: ${used} MB\n👑 Owner: 254748339103\n🤖 Version: V2 GO\n✅ Online`})
 }
}
