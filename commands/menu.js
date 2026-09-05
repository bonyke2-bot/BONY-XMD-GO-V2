module.exports = {
 name: "menu",
 desc: "Show all commands",
 async exec(m, sock) {
  const { BOT_IMAGE, BOT_NAME, GROUP_LINK, CHANNEL_LINK } = require('../config')
  const txt = `*╭─── ${BOT_NAME} ───*
*│* Total: 33 Commands
*╰────────────────*

*👥 GROUP:* .tagall .hidetag .kick .promote .demote .link .revoke .open .close .group .warn
*📥 DOWNLOAD:* .tiktok .fb .instagram .play .ytdl
*🛠️ TOOLS:* .sticker .toaudio .viewonce .del .status .ping .alive .owner
*🤖 EXTRA:* .ai .chatbot .antilink .welcome .goodbye .antidelete .block .unblock

*╭─── JOIN US ───*
*│* 📢 Channel: ${CHANNEL_LINK}
*│* 👥 Group: ${GROUP_LINK}
*╰────────────────*
_Powered by BONY-XMD GO V2_`
  try { await sock.sendMessage(m.chat, {image: {url: BOT_IMAGE}, caption: txt}) } 
  catch { await sock.sendMessage(m.chat, {text: txt}) }
 }
}
