module.exports = {
 name: "menu",
 desc: "Show all commands",
 async exec(m, sock) {
   const menu = `
╭─── *BONY-XMD V2* ───
│ 👑 Owner: Bonyke
│ ⚡ Version: 2.0
│ 📍 Prefix: .
╰────────────────

╭─── *MAIN* ───
│ .ping - speed
│ .menu - this list
│ .alive - bot status
│ .owner - owner contact
╰────────────

╭─── *TOOLS* ───
│ .sticker - image to sticker
│ .play - download song
│ .ai - ask ai
╰────────────
`
   await sock.sendMessage(m.chat, {text: menu})
 }
}
