const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

async function getSess(){
  const { state, saveCreds } = await useMultiFileAuthState('./my-sess');
  const sock = makeWASocket({auth: state, logger: pino({level:'silent'}), printQRInTerminal:false, browser:['BONY','Chrome','1.0']});
  sock.ev.on('creds.update', saveCreds);
  if(!state.creds.registered){
    const num = await (async()=>{ process.stdout.write('Enter WhatsApp number with country code (2547...): '); 
      return await new Promise(r=>{ process.stdin.once('data', d=> r(d.toString().trim())) }) })();
    const code = await sock.requestPairingCode(num);
    console.log('\n\nYOUR PAIR CODE: '+code+'\n\nGo to WhatsApp > Linked Devices > Link with phone number > Enter this code!\n');
  }
  sock.ev.on('connection.update', async(u)=>{
    if(u.connection==='open'){
      console.log('✅ CONNECTED! Now getting SESSION_ID...');
      await new Promise(r=> setTimeout(r,3000));
      const data = fs.readFileSync('./my-sess/creds.json','utf8');
      const b64 = Buffer.from(data).toString('base64');
      console.log('\n\n===== YOUR SESSION_ID COPY THIS =====\n');
      console.log(b64);
      console.log('\n===== END =====\n');
      process.exit(0);
    }
  });
}
getSess();
