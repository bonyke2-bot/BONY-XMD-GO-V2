module.exports = {
 name: "owner",
 desc: "Get owner",
 async exec(m, sock) {
   const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Bonyke\nTEL;type=CELL;type=VOICE;waid=2547xxxxxxxx:+254 7xx xxxxxx\nEND:VCARD'
   await sock.sendMessage(m.chat, { contacts: { displayName: 'Bonyke', contacts: [{ vcard }] } })
 }
}
