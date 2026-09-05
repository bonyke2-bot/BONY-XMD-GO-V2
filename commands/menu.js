module.exports = {
 name: "menu",
 desc: "Show menu",
 async exec(m, sock) {
  const cmds = `
*╭─── BONY-XMD-GO-V2 ───*
*│* Owner: 254748339103
*│* Commands: 33
*│* Version: GO V2
*╰────────────────*

*GROUP:*
.tagall, .hidetag, .kick, .promote, .demote, .link, .revoke, .open, .close, .group, .warn

*DOWNLOAD:*
.tiktok, .fb, .instagram, .play, .ytdl

*TOOLS:*
.sticker, .toaudio, .viewonce, .del, .status, .ping, .alive

*AI & EXTRA:*
.ai, .chatbot, .antilink, .welcome, .goodbye, .antidelete, .block, .unblock

*OWNER:*
.owner

_Type .menu for help_`
  await sock.sendMessage(m.chat, {text: cmds})
 }
}
