module.exports = {
 name: "tagall",
 desc: "Tag all members",
 async exec(m, sock) {
   if(!m.isGroup) return sock.sendMessage(m.chat, {text: "*Group only!*"})
   const meta = await sock.groupMetadata(m.chat)
   let mentions=[]; let txt = `*TAGALL - ${meta.subject}*\n\n`
   for(let p of meta.participants){ txt+=`@${p.id.split("@")[0]} `; mentions.push(p.id) }
   await sock.sendMessage(m.chat, {text: txt, mentions})
 }
}
