module.exports = {
 name: "del",
 desc: "Delete bot message",
 async exec(m, sock) {
   if(!m.quoted) return sock.sendMessage(m.chat, {text: "Reply to bot message with.del"})
   await sock.sendMessage(m.chat, {delete: m.quoted.key})
 }
}
