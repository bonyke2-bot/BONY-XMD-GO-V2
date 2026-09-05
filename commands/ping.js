module.exports = {
 name: "ping",
 desc: "Check bot speed",
 async exec(m, sock) {
  const start = Date.now()
  const { FOOTER, GROUP_LINK, CHANNEL_LINK } = require('../config')
  await sock.sendMessage(m.chat, {react: {text: "⚡", key: m.key}})
  const speed = Date.now() - start
  const text = `*⚡ BONY-XMD GO V2 - PING*\n\n🚀 Speed: ${speed}ms\n✅ Active\n\n📢 Channel: ${CHANNEL_LINK}\n👥 Group: ${GROUP_LINK}\n\n${FOOTER}`
  await sock.sendMessage(m.chat, {text})
 }
}
