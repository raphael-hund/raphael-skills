import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR:', err.message, err.stack));
const resp = await page.goto('http://127.0.0.1:5173/events', { waitUntil: 'networkidle' });
console.log('status', resp.status());
await page.waitForTimeout(1500);
const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 800));
console.log('BODY TEXT:', JSON.stringify(bodyText));
const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML.length);
console.log('root innerHTML length:', rootHtml);
await browser.close();
