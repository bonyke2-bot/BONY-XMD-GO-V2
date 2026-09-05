module.exports = {
 name: "unblock",
 desc: "Unblock user",
 async exec(m, sock) {
   let user = m.mentionedJid?.[0]
   if(!user) return sock.sendMessage(m.chat, {text: "Tag user"})
   await sock.updateBlockStatus(user, "unblock")
   await sock.sendMessage(m.chat, {text: "User unblocked"})
 }
}
