module.exports = {
 name: "group",
 desc: "Group commands list",
 async exec(m, sock) {
   await sock.sendMessage(m.chat, {text: `*GROUP COMMANDS*\n\n.tagall - tag all\n.kick @user\n.promote @user\n.demote @user\n.hidetag [text]\n.link - get link\n.open - open group\n.close - close group\n\nUse:.tagall hello`})
 }
}
