module.exports = {
 name: "close",
 desc: "Close group",
 async exec(m, sock) {
   if(!m.isGroup) return
   await sock.groupSettingUpdate(m.chat, 'announcement')
   await sock.sendMessage(m.chat, {text: "✅ Group closed! Only admins can chat."})
 }
}
