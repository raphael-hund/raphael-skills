import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const result={browser:browser.version(),states:[]};
try {
 const page=await browser.newPage();await page.goto('http://127.0.0.1:4600/');
 for(const reducedMotion of ['no-preference','reduce']) {
  await page.emulateMedia({reducedMotion});await page.getByRole('button',{name:'Open service quick view'}).click();
  await page.waitForTimeout(250);
  const close=await page.evaluate(async()=>{
   const content=document.querySelector('[data-slot="dialog-content"]');
   const overlay=document.querySelector('[data-slot="dialog-overlay"]');
   content.querySelector('[data-slot="dialog-close"]').click();
   await new Promise(resolve=>setTimeout(resolve,40));
   return {contentConnected:content.isConnected,overlayConnected:overlay.isConnected,state:content.dataset.state,contentAnimation:getComputedStyle(content).animationName,overlayAnimation:getComputedStyle(overlay).animationName,overlayOpacity:getComputedStyle(overlay).opacity};
  });
  result.states.push({reducedMotion,after40ms:close});
  if(reducedMotion==='no-preference') {
   assert.ok(close.contentConnected && close.overlayConnected,'Both animated portal children must stay mounted during exit');
   assert.equal(close.state,'closed');assert.match(close.contentAnimation,/exit/);assert.match(close.overlayAnimation,/exit/);
   assert.ok(Number(close.overlayOpacity)>0 && Number(close.overlayOpacity)<1);
  } else assert.equal(close.contentConnected || close.overlayConnected,false);
  await page.locator('[data-slot="dialog-content"]').waitFor({state:'detached'});
  await page.locator('[data-slot="dialog-overlay"]').waitFor({state:'detached'});
  assert.ok(await page.getByRole('button',{name:'Open service quick view'}).evaluate(e=>e===document.activeElement));
 }
 result.status='PASS';
} finally {
 await browser.close();await writeFile('../evidence/motion-results.json',JSON.stringify(result,null,2)+'\n');
}
console.log(JSON.stringify(result,null,2));
