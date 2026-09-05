module.exports = {
 name: "block",
 desc: "Block user",
 async exec(m, sock) {
   let user = m.mentionedJid?.[0] || m.quoted?.participant
   if(!user) return sock.sendMessage(m.chat, {text: "Tag user to block"})
   await sock.updateBlockStatus(user, "block")
   await sock.sendMessage(m.chat, {text: "User blocked"})
 }
}
