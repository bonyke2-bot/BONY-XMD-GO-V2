module.exports = {
 name: "hidetag",
 desc: "Hide tag all",
 async exec(m, sock) {
   if(!m.isGroup) return
   const meta = await sock.groupMetadata(m.chat)
   let mentions=[]
   for(let p of meta.participants) mentions.push(p.id)
   let text = m.text.split(" ").slice(1).join(" ") || "Hello everyone 👋"
   await sock.sendMessage(m.chat, {text: text, mentions})
 }
}
