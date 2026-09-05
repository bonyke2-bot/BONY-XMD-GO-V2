module.exports = {
 name: "antilink",
 desc: "Anti link control",
 async exec(m, sock) {
   await sock.sendMessage(m.chat, {text: "*Antilink*\n.antilink on\n.antilink off\n(needs lib/antilink.js to work)"})
 }
}
