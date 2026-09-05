module.exports = {
 name: "chatbot",
 desc: "Chatbot on/off",
 async exec(m, sock) {
   const q = m.text.split(" ")[1]
   await sock.sendMessage(m.chat, {text: `Chatbot ${q || "on/off"} - ${q==="on"?"Enabled in this chat":"Use.chatbot on"}`})
 }
}
