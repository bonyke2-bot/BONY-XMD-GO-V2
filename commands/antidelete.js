module.exports = {
 name: "antidelete",
 desc: "Anti delete",
 async exec(m, sock) {
   await sock.sendMessage(m.chat, {text: "*Antidelete:*\n.antidelete on/off\n(Currently placeholder - needs lib/antidelete.js)"})
 }
}
