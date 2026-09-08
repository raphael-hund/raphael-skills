// Story per Streifen-Outpaint: oberer und unterer Feed-Streifen (je 500px) werden je um 285px nach aussen erweitert; nur das neue Band wird verwendet, Feed bleibt pixelgenau.
import fs from 'node:fs';import path from 'node:path';import {spawn,execFileSync} from 'node:child_process';
const out=process.env.STATICS_OUT;if(!out)throw Error("STATICS_OUT (Ordner mit feed/, master/, story/) setzen");const id=process.argv[2];const dir=path.join(out,'master','strips');fs.mkdirSync(dir,{recursive:true});
function run(a){return new Promise((res,rej)=>{const p=spawn('higgsfield',a,{stdio:['ignore','pipe','pipe']});let s='',e='';p.stdout.on('data',d=>s+=d);p.stderr.on('data',d=>e+=d);p.on('error',rej);p.on('close',c=>c===0?res(s):rej(Error(e||s)));});}
const feed=path.join(out,'feed',id+'-4x5.png');
execFileSync('convert',[feed,'-crop','1080x500+0+0','+repage',path.join(dir,id+'-top-src.png')]);
execFileSync('convert',[feed,'-crop','1080x500+0+850','+repage',path.join(dir,id+'-bot-src.png')]);
async function op(side){const jf=path.join(dir,id+'-'+side+'-job.json');if(fs.existsSync(jf)){const j=JSON.parse(fs.readFileSync(jf));return (Array.isArray(j)?j[0]:j);}
 const args=['--image',path.join(dir,id+'-'+side+'-src.png'),'--expand-top',side==='top'?'285':'0','--expand-bottom',side==='bot'?'285':'0'];
 const r=await run(['generate','create','flux_2_pro_outpaint',...args,'--wait','--json']);fs.writeFileSync(jf,r);const p=JSON.parse(r);const j=Array.isArray(p)?p[0]:p;if(j.status!=='completed'||!j.result_url)throw Error('incomplete '+side);
 const b=await fetch(j.result_url);fs.writeFileSync(path.join(dir,id+'-'+side+'-raw.png'),Buffer.from(await b.arrayBuffer()));console.log('SAVED',id,side,j.id);return j;}
await Promise.all([op('top'),op('bot')]);
// Raw hat Höhe 785 (bei 1080 Breite, ggf. skaliert): auf 1080x785 normalisieren, neues Band ausschneiden
execFileSync('convert',[path.join(dir,id+'-top-raw.png'),'-resize','1080x785!',path.join(dir,id+'-top-n.png')]);
execFileSync('convert',[path.join(dir,id+'-bot-raw.png'),'-resize','1080x785!',path.join(dir,id+'-bot-n.png')]);
execFileSync('convert',[path.join(dir,id+'-top-n.png'),'-crop','1080x315+0+0','+repage',path.join(dir,id+'-top-band.png')]); // 285 neu + 30 Überlappung
execFileSync('convert',[path.join(dir,id+'-bot-n.png'),'-crop','1080x315+0+470','+repage',path.join(dir,id+'-bot-band.png')]);
// Zusammensetzen: Bänder überlappen 30px in den Feed hinein, Feed liegt oben mit gefeatherter Maske
execFileSync('convert',[path.join(dir,id+'-top-band.png'),'-gravity','north','-background','black','-extent','1080x1920',path.join(dir,id+'-canvas-top.png')]);
execFileSync('convert',[path.join(dir,id+'-canvas-top.png'),path.join(dir,id+'-bot-band.png'),'-gravity','south','-composite',path.join(dir,id+'-canvas.png')]);
execFileSync('convert',['-size','1080x1920','xc:black','-fill','white','-draw','rectangle 0,300 1080,1620','-blur','0x8',path.join(dir,id+'-mask.png')]);
execFileSync('convert',[feed,'-gravity','center','-background','black','-extent','1080x1920',path.join(dir,id+'-feedcanvas.png')]);
execFileSync('convert',[path.join(dir,id+'-canvas.png'),path.join(dir,id+'-feedcanvas.png'),path.join(dir,id+'-mask.png'),'-composite',path.join(out,'story',id+'-9x16.png')]);
console.log('STORY',id);
