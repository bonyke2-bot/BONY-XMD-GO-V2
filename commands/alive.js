module.exports = {
 name: "alive",
 desc: "Bot alive",
 async exec(m, sock) {
  const { BOT_IMAGE, BOT_NAME, OWNER_NAME } = require('../config')
  const text = `*${BOT_NAME} is Alive!* ✅\n\n👑 Owner: ${OWNER_NAME}\n⚡ Version: GO V2\n🕐 Uptime: Online`
  try {
    await sock.sendMessage(m.chat, {image: {url: BOT_IMAGE}, caption: text})
  } catch {
    await sock.sendMessage(m.chat, {text})
  }
 }
}
