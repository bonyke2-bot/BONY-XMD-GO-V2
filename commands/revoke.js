module.exports = {
 name: "revoke",
 desc: "Revoke link",
 async exec(m, sock) {
   if(!m.isGroup) return
   await sock.groupRevokeInvite(m.chat)
   await sock.sendMessage(m.chat, {text: "✅ Group link revoked!"})
 }
}
