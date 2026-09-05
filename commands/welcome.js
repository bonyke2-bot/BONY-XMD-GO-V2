module.exports = {
 name: "welcome",
 desc: "Welcome control",
 async exec(m, sock) {
   if(!m.isGroup) return
   const q = m.text.split(" ")[1]
   if(!q) return sock.sendMessage(m.chat, {text: "*Welcome*\n.welcome on/off"})
   await sock.sendMessage(m.chat, {text: `Welcome ${q} - set!`})
 }
}
