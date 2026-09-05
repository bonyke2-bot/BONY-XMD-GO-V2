module.exports = {
 name: "goodbye",
 desc: "Goodbye control",
 async exec(m, sock) {
   await sock.sendMessage(m.chat, {text: "*Goodbye*\n.goodbye on/off"})
 }
}
