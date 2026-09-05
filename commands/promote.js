module.exports = {
 name: "promote",
 desc: "Promote to admin",
 async exec(m, sock) {
   let user = m.mentionedJid?.[0]
   if(!user) return sock.sendMessage(m.chat, {text: "Tag user:.promote @user"})
   await sock.groupParticipantsUpdate(m.chat, [user], "promote")
   await sock.sendMessage(m.chat, {text: "✅ Promoted to admin!"})
 }
}
