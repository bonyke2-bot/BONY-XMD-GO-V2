module.exports = {
 name: "menu",
 desc: "Show menu",
 async exec(m, sock) {
  const { BOT_IMAGE, BOT_NAME } = require('../config')
  const cmds = `
*╭─── ${BOT_NAME} ───*
*│* Commands: 33
*│* Owner: 254748339103
*╰────────────────*

*GROUP:* .tagall, .hidetag, .kick, .promote, .demote, .link, .revoke, .open, .close, .group, .warn

*DOWNLOAD:* .tiktok, .fb, .instagram, .play, .ytdl

*TOOLS:* .sticker, .toaudio, .viewonce, .del, .status, .ping, .alive

*AI & EXTRA:* .ai, .chatbot, .antilink, .welcome, .goodbye, .antidelete, .block, .unblock

*OWNER:* .owner`

  try {
    await sock.sendMessage(m.chat, {image: {url: BOT_IMAGE}, caption: cmds})
  } catch {
    await sock.sendMessage(m.chat, {text: cmds})
  }
 }
}
