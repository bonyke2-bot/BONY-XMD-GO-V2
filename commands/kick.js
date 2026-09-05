module.exports = {
 name: "kick",
 desc: "Kick member",
 async exec(m, sock) {
   if(!m.isGroup) return
   let user = m.mentionedJid?.[0] || (m.quoted && m.quoted.participant)
   if(!user) return sock.sendMessage(m.chat, {text: "Usage:.kick @user"})
   await sock.groupParticipantsUpdate(m.chat, [user], "remove")
   await sock.sendMessage(m.chat, {text: "✅ Kicked!"})
 }
}
