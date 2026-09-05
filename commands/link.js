module.exports = {
 name: "link",
 desc: "Group invite link",
 async exec(m, sock) {
   if(!m.isGroup) return sock.sendMessage(m.chat, {text: "Group only!"})
   const code = await sock.groupInviteCode(m.chat)
   await sock.sendMessage(m.chat, {text: `*Group Link:*\nhttps://chat.whatsapp.com/${code}`})
 }
}
