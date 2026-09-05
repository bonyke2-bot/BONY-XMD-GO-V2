module.exports = {
 name: "sticker",
 alias: ["s"],
 desc: "Create sticker",
 async exec(m, sock) {
   if(!m.quoted && !m.msg.imageMessage) return await sock.sendMessage(m.chat, {text: "Reply to image!"})
   await sock.sendMessage(m.chat, {text: "_Creating sticker..._"} )
 }
}
