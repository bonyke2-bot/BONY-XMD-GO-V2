module.exports = {
 name: "fb",
 desc: "Download Facebook",
 async exec(m, sock) {
   const url = m.text.split(" ")[1]
   if(!url) return sock.sendMessage(m.chat, {text: "*Usage:.fb <fb link>*"})
   await sock.sendMessage(m.chat, {text: "_Downloading Facebook..._"})
   try {
     const res = await fetch(`https://api.vreden.my.id/api/fbdown?url=${encodeURIComponent(url)}`)
     const data = await res.json()
     if(data.data && data.data.hd){
       await sock.sendMessage(m.chat, {video: {url: data.data.hd}, caption: "*FB Video*"})
     } else {
       await sock.sendMessage(m.chat, {text: "Failed, try.tiktok first to test"})
     }
   } catch {
     await sock.sendMessage(m.chat, {text: "FB downloader error"})
   }
 }
}
