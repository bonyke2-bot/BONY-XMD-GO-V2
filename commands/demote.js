module.exports = {
 name: "demote",
 desc: "Demote admin",
 async exec(m, sock) {
   let user = m.mentionedJid?.[0]
   if(!user) return sock.sendMessage(m.chat, {text: "Tag user:.demote @user"})
   await sock.groupParticipantsUpdate(m.chat, [user], "demote")
   await sock.sendMessage(m.chat, {text: "✅ Demoted!"})
 }
}
