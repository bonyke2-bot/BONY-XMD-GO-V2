const express = require('express');
const fs = require('fs-extra');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req,res)=> res.send('BONY-XMD GO V2 ALIVE ✅'));
app.listen(PORT, ()=> console.log('WEB ON', PORT));

async function restoreSession(){
  const sid = process.env.SESSION_ID;
  if(!sid){ console.log('NO SESSION_ID IN HEROKU VARS!'); return; }
  try{
    await fs.ensureDir('./session');
    const decoded = Buffer.from(sid, 'base64').toString('utf-8');
    await fs.writeFile('./session/creds.json', decoded);
    console.log('✅ Session restored from ENV!');
  }catch(e){ console.log('Session restore error:', e.message); }
}

async function startBot(){
  await restoreSession();
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({ auth: state, logger: pino({level:'silent'}), browser:['BONY','Chrome','1.0.0'], printQRInTerminal:false });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (u)=>{
    const {connection, lastDisconnect} = u;
    if(connection==='open') console.log('✅ BONY-XMD CONNECTED!');
    if(connection==='close'){
      if(lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut){
        console.log('Reconnecting...');
        setTimeout(startBot, 5000);
      }
    }
  });
}
startBot();
