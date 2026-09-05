module.exports = {
 name: "viewonce",
 desc: "Save view once",
 async exec(m, sock) {
   if(!m.quoted) return sock.sendMessage(m.chat, {text: "Reply to viewonce message with.viewonce"})
   await sock.sendMessage(m.chat, {text: "_Trying to open viewonce..._\nFeature needs handler in index.js"})
 }
}
