module.exports = {
 name: "toaudio",
 desc: "Video to audio",
 async exec(m, sock) {
   if(!m.quoted ||!m.quoted.video) return sock.sendMessage(m.chat, {text: "Reply to a video with.toaudio"})
   await sock.sendMessage(m.chat, {text: "Converting..."})
 }
}
