module.exports = {
 name: "alive",
 desc: "Bot alive",
 async exec(m, sock) {
  const { BOT_IMAGE, GROUP_LINK, CHANNEL_LINK, FOOTER } = require('../config')
  const text = `*✅ BONY-XMD GO V2 IS ALIVE!*\n\n🤖 33 Commands Active\n⚡ Fast\n👑 Owner: 254748339103\n\n📢 Channel: ${CHANNEL_LINK}\n👥 Group: ${GROUP_LINK}\n\n${FOOTER}`
  try { await sock.sendMessage(m.chat, {image: {url: BOT_IMAGE}, caption: text}) } 
  catch { await sock.sendMessage(m.chat, {text}) }
 }
}
