module.exports = {
 name: "tiktok",
 desc: "Download tiktok",
 async exec(m, sock) {
   const url = m.text.split(" ")[1]
   if(!url) return sock.sendMessage(m.chat, {text: "*Usage:.tiktok <tiktok link>*"})
   await sock.sendMessage(m.chat, {text: "_Downloading TikTok..._"})
   try {
     const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`)
     const data = await res.json()
     if(data.data && data.data.play){
       await sock.sendMessage(m.chat, {video: {url: data.data.play}, caption: "*BONY-XMD V2 - TikTok Downloaded*"})
     } else {
       await sock.sendMessage(m.chat, {text: "Failed to download, try another link"})
     }
   } catch(e){
     await sock.sendMessage(m.chat, {text: "Error downloading tiktok"})
   }
 }
}
