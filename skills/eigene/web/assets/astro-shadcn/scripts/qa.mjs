import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base = 'http://127.0.0.1:4600';
const evidence = new URL('../../evidence/', import.meta.url);
await mkdir(evidence, {recursive:true});
const result = {driver:'local Playwright Chromium (ordinary application regression harness)',checks:[],consoleErrors:[],pageErrors:[]};
const home = await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const service = await readFile(new URL('../dist/service/index.html',import.meta.url),'utf8');
assert.match(home,/data-slot="card"/); assert.match(home,/This content is already in the HTML response/);
assert.equal((home.match(/<astro-island /g)||[]).length,1); assert.match(home,/disabled/);
assert.doesNotMatch(service,/<script|<astro-island|renderer-url=/i);
result.checks.push({group:'1 raw HTML',status:'PASS',homeSSRCard:true,islands:1,serviceScripts:0});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
result.browser=browser.version();
try {
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 const page=await context.newPage();
 page.on('console',m=>{if(m.type()==='error') result.consoleErrors.push(m.text());});
 page.on('pageerror',e=>result.pageErrors.push(e.message));
 const requests=[]; page.on('request',r=>requests.push({url:r.url(),type:r.resourceType()}));
 const response=await page.goto(`${base}/service/`); assert.equal(response.status(),200);
 await page.screenshot({path:new URL('service-desktop.png',evidence).pathname,fullPage:true});
 assert.equal(requests.filter(r=>r.type==='script').length,0);
 result.checks.push({group:'2 static route',status:'PASS',http:response.status(),requests:[...requests]});
 await page.goto(base); await page.getByRole('button',{name:'Open service quick view'}).waitFor();
 const baseline=()=>page.evaluate(()=>['baseline-title','topic','native-button'].map(id=>{const e=document.getElementById(id),s=getComputedStyle(e);return {id,font:s.font,color:s.color,background:s.backgroundColor,border:s.border,borderRadius:s.borderRadius,padding:s.padding,margin:s.margin,boxSizing:s.boxSizing,display:s.display};}));
 const styled=await baseline();
 await page.evaluate(()=>{document.querySelector('link[href*="/_astro/index."]').disabled=true;});
 const plain=await baseline(); assert.deepEqual(styled,plain);
 await page.evaluate(()=>{document.querySelector('link[href*="/_astro/index."]').disabled=false;});
 result.checks.push({group:'native CSS baseline',status:'PASS',withComponents:styled,withoutComponents:plain});
 for(const width of [1280,375]) {
  await page.setViewportSize({width,height:width===375?844:900});
  await page.screenshot({path:new URL(`home-${width}.png`,evidence).pathname,fullPage:true});
  const trigger=page.getByRole('button',{name:'Open service quick view'});
  await trigger.click(); const dialog=page.getByRole('dialog',{name:'Service details'}); await dialog.waitFor();
  await page.waitForTimeout(250);
  const geometry=await dialog.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),o=document.querySelector('[data-slot="dialog-overlay"]'),os=getComputedStyle(o),or=o.getBoundingClientRect();return {position:s.position,zIndex:s.zIndex,background:s.backgroundColor,x:r.x,y:r.y,width:r.width,height:r.height,viewportWidth:innerWidth,viewportHeight:innerHeight,overlay:{position:os.position,background:os.backgroundColor,opacity:os.opacity,width:or.width,height:or.height},label:document.getElementById(e.getAttribute('aria-labelledby')).textContent,description:document.getElementById(e.getAttribute('aria-describedby')).textContent};});
  assert.equal(geometry.position,'fixed'); assert.equal(geometry.overlay.position,'fixed');
  assert.match(geometry.overlay.background,/0\.5\)/); assert.equal(geometry.overlay.opacity,'1');
  assert.ok(geometry.x>=0 && geometry.y>=0 && geometry.x+geometry.width<=geometry.viewportWidth+1 && geometry.y+geometry.height<=geometry.viewportHeight+1);
  assert.equal(geometry.background,'rgb(246, 244, 239)');
  assert.equal(geometry.overlay.height,geometry.viewportHeight);
  await page.screenshot({path:new URL(`dialog-${width}.png`,evidence).pathname,fullPage:false});
  for(let i=0;i<5;i++){await page.keyboard.press('Tab');assert.ok(await dialog.evaluate(e=>e.contains(document.activeElement)));}
  await page.keyboard.press('Escape'); await dialog.waitFor({state:'hidden'});
  assert.ok(await trigger.evaluate(e=>e===document.activeElement));
  await trigger.click(); await page.getByRole('button',{name:'Close quick view'}).click();
  await dialog.waitFor({state:'hidden'}); assert.ok(await trigger.evaluate(e=>e===document.activeElement));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  result.checks.push({group:'3 dialog keyboard and visible geometry',status:'PASS',width,geometry,focusTrap:true,escapeRestore:true,closeRestore:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'}); await page.getByRole('button',{name:'Open service quick view'}).click();
 assert.equal(await page.getByRole('dialog').evaluate(e=>getComputedStyle(e).animationName),'none'); await page.keyboard.press('Escape');
 await page.getByLabel('Topic',{exact:true}).fill('Static service'); await page.getByRole('button',{name:'View details',exact:true}).click(); await page.waitForURL('**/service/?topic=Static+service#details');
 result.checks.push({group:'native form and reduced motion',status:'PASS'});
 await context.close();
 for(const mode of ['js-off','download-failure']) {
  const ctx=await browser.newContext({javaScriptEnabled:mode!=='js-off',viewport:{width:375,height:844}});
  if(mode==='download-failure') await ctx.route('**/*.js',r=>r.abort('failed'));
  const p=await ctx.newPage(); await p.goto(base);
  assert.ok(await p.getByRole('button',{name:'Loading quick view…'}).isDisabled());
  assert.ok(await p.getByText('This content is already in the HTML response.',{exact:false}).isVisible());
  await p.screenshot({path:new URL(`${mode}-mobile.png`,evidence).pathname,fullPage:true});
  await p.locator('#always-details').click(); assert.equal(new URL(p.url()).pathname,'/service/');
  assert.ok(await p.getByRole('heading',{name:'What the integration includes'}).isVisible());
  await p.screenshot({path:new URL(`service-${mode}-mobile.png`,evidence).pathname,fullPage:true});
  result.checks.push({group:'4 JS-off / failure mobile',mode,status:'PASS',disabledPending:true,SSRCardVisible:true,nativeDetailsLink:true});
  await ctx.close();
 }
 assert.deepEqual(result.consoleErrors,[]); assert.deepEqual(result.pageErrors,[]);
 result.status='PASS';
} finally {
 await browser.close(); await writeFile(new URL('qa-results.json',evidence),JSON.stringify(result,null,2)+'\n');
}
console.log(JSON.stringify(result,null,2));
