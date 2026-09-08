import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
const assets=[];
for(const name of await readdir('dist/_astro')) {
 const bytes=await readFile(`dist/_astro/${name}`);
 assets.push({path:`_astro/${name}`,raw:bytes.length,gzip:gzipSync(bytes,{level:9}).length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
const html=[];
for(const path of ['index.html','service/index.html']) {
 const bytes=await readFile(`dist/${path}`);
 const inline=[...bytes.toString().matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
 html.push({path,raw:bytes.length,gzip:gzipSync(bytes,{level:9}).length,inlineJSRaw:Buffer.byteLength(inline),inlineJSGzip:inline?gzipSync(inline,{level:9}).length:0});
}
const total=extension=>assets.filter(a=>a.path.endsWith(extension)).reduce((sum,a)=>({raw:sum.raw+a.raw,gzip:sum.gzip+a.gzip}),{raw:0,gzip:0});
await writeFile('../evidence/asset-sizes.json',JSON.stringify({method:'Bytes on disk; gzip level 9 per asset, summed. HTML gzip includes inline runtime; do not add inline gzip twice. HTTP headers/protocol overhead excluded.',assets,html,js:total('.js'),css:total('.css')},null,2)+'\n');
