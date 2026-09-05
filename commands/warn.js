module.exports = {
 name: "warn",
 desc: "Warn user",
 async exec(m, sock) {
   let user = m.mentionedJid?.[0]
   if(!user) return sock.sendMessage(m.chat, {text: "Tag user:.warn @user"})
   await sock.sendMessage(m.chat, {text: `⚠️ Warned @${user.split("@")[0]}`, mentions:[user]})
 }
}
