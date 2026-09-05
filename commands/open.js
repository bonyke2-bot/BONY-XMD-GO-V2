module.exports = {
 name: "open",
 desc: "Open group",
 async exec(m, sock) {
   if(!m.isGroup) return
   await sock.groupSettingUpdate(m.chat, 'not_announcement')
   await sock.sendMessage(m.chat, {text: "✅ Group opened!"})
 }
}
