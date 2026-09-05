module.exports = {
 name: "ai",
 desc: "AI chat",
 async exec(m, sock) {
   const q = m.text.split(" ").slice(1).join(" ")
   if(!q) return sock.sendMessage(m.chat, {text: "Usage:.ai <question>"})
   await sock.sendMessage(m.chat, {text: "_Thinking..._"})
   try {
     const res = await fetch(`https://api.vreden.my.id/api/openai?query=${encodeURIComponent(q)}`)
     const data = await res.json()
     await sock.sendMessage(m.chat, {text: data.result || "AI no response, try again"})
   } catch {
     await sock.sendMessage(m.chat, {text: "AI error, try later"})
   }
 }
}
