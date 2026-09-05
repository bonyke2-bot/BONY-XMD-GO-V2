module.exports = {
 name: "ytdl",
 desc: "Youtube download",
 async exec(m, sock) {
   const url = m.text.split(" ")[1]
   if(!url) return sock.sendMessage(m.chat, {text: "Usage:.ytdl <youtube link>"})
   await sock.sendMessage(m.chat, {text: "_Downloading YT..._"})
 }
}
