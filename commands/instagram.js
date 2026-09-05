module.exports = {
 name: "instagram",
 desc: "Download IG",
 async exec(m, sock) {
   const url = m.text.split(" ")[1]
   if(!url) return sock.sendMessage(m.chat, {text: "Usage:.instagram <ig link>"})
   await sock.sendMessage(m.chat, {text: "_Downloading IG..._"})
   await sock.sendMessage(m.chat, {text: "IG downloader - add your API here"})
 }
}
