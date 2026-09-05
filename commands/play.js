module.exports = {
 name: "play",
 desc: "Play audio from yt",
 async exec(m, sock) {
   const q = m.text.split(" ").slice(1).join(" ")
   if(!q) return sock.sendMessage(m.chat, {text: "Usage:.play <song name>"})
   await sock.sendMessage(m.chat, {text: `*_Searching:* ${q}..._`})
   await sock.sendMessage(m.chat, {text: "YT Play feature - needs ytdl API, add later"})
 }
}
