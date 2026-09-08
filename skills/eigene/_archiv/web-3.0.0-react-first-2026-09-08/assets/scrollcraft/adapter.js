const query = new URLSearchParams(location.search);
const requestedMode = query.get('mode') || 'video';
const allowedModes = document.body.dataset.allowedModes?.split(' ') || ['video','sequence','asset','still'];
const mode = allowedModes.includes(requestedMode) ? requestedMode : 'still';
document.body.dataset.mode=mode;
const act = document.querySelector('#act');
const clip = document.querySelector('#clip');
const canvas = document.querySelector('#sequence');
const poster = document.querySelector('#poster');
const asset = document.querySelector('#asset');
const state = document.querySelector('#state');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 860px), (pointer: coarse)');
const urls = [];
let animation;
let stopped = false;
let scheduled = false;
const evidence = {mode, state:'poster', bytes:0, progress:0, drawn:-1, source:null};
window.probe = evidence;
for (const a of document.querySelectorAll('nav a')) {
  if (new URL(a.href).searchParams.get('mode') === mode) a.setAttribute('aria-current','page');
}
function fallback(reason) {
  stopped = true;
  animation?.cancel();
  clip.pause();
  asset.hidden = true;
  document.body.classList.add('is-static');
  evidence.state = reason;
  state.textContent = `Poster: ${reason}`;
}
const controller = new AbortController();
addEventListener('pagehide', () => {
  controller.abort();
  for (const url of urls) URL.revokeObjectURL(url);
}, {once:true});
reduce.addEventListener('change', () => {
  if (reduce.matches) { controller.abort(); fallback('reduced-motion changed'); }
});
async function boundedBlob(path, limit, timeoutMs) {
  const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(timeoutMs)]);
  const r = await fetch(path, {signal});
  if (!r.ok) throw Error(`HTTP ${r.status}`);
  const declared = Number(r.headers.get('content-length'));
  if (declared > limit) throw Error('load budget');
  const reader = r.body.getReader();
  const chunks = [];
  let bytes = 0;
  for (;;) {
    const {done,value} = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    evidence.bytes += value.byteLength;
    if (bytes > limit) { await reader.cancel(); throw Error('load budget'); }
    chunks.push(value);
  }
  const url = URL.createObjectURL(new Blob(chunks,{type:r.headers.get('content-type') || 'application/octet-stream'}));
  urls.push(url);
  return {url,bytes};
}
function mount() {
  window.ScrollCraft.mount(document.body);
  evidence.state = 'mounted';
  state.textContent = `${mode}: Scroll-Runtime aktiv`;
}
function onProgress(render) {
  const update = () => {
    scheduled = false;
    if (stopped) return;
    const p = Number(getComputedStyle(act).getPropertyValue('--sc-p')) || 0;
    evidence.progress = p;
    render(p);
  };
  const request = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  request();
}
function videoReadyGate(timeoutMs) {
  const timer = setTimeout(() => fallback('decode timeout'),timeoutMs);
  const show = () => {
    if (stopped) return;
    clearTimeout(timer);
    clip.setAttribute('data-ready','');
    evidence.state = 'video-ready';
  };
  clip.addEventListener('error',() => { clearTimeout(timer); fallback('media decode error'); },{once:true});
  if ('requestVideoFrameCallback' in clip) clip.requestVideoFrameCallback(show);
  else clip.addEventListener('loadeddata',show,{once:true});
}
try {
  const r = await fetch('manifest.json');
  if (!r.ok) throw Error(`manifest HTTP ${r.status}`);
  const manifest = await r.json();
  const policy = manifest.policy;
  if (!policy || !Number.isFinite(policy.maxVideoBytes) || !Number.isFinite(policy.timeoutMs)) throw Error('invalid policy');
  document.querySelector('#description').textContent = mode === 'asset' && manifest.asset ? (manifest.assetLabel || 'Vorhandenes Einzelasset') : manifest.label;
  poster.src = mode === 'asset' ? (manifest.asset || manifest.poster) : manifest.poster;

  const original = mode.startsWith('original-');
  if (mode === 'still') fallback('still selected');
  else if (!original && reduce.matches) fallback('reduced-motion');
  else if (!original && navigator.connection?.saveData) fallback('save-data');
  else if (!original && mobile.matches && !policy.mobileVideo) fallback('mobile poster policy');
  else if (mode === 'video' || mode === 'original-video') {
    const source = mobile.matches && manifest.mobileVideo ? manifest.mobileVideo : manifest.video;
    evidence.source = source;
    if (manifest.mobilePoster && mobile.matches) poster.src = manifest.mobilePoster;
    clip.setAttribute('data-sc-scrub','');
    if (original) {
      clip.setAttribute('data-sc-src',source);
      clip.addEventListener('loadeddata',() => clip.setAttribute('data-ready',''),{once:true});
    } else {
      const media = await boundedBlob(source,policy.maxVideoBytes,policy.timeoutMs);
      clip.setAttribute('data-sc-src',media.url);
      videoReadyGate(policy.timeoutMs);
    }
    mount();
    onProgress(() => {});
  } else if (mode === 'original-sequence') {
    const s = manifest.sequence;
    canvas.setAttribute('data-sc-sequence',`${s.template}:${s.count}:${s.start}`);
    canvas.setAttribute('data-ready','');
    mount();
    onProgress(() => {});
  } else if (mode === 'sequence') {
    const s = manifest.sequence;
    if (!Number.isInteger(s.count) || s.count < 1 || s.count > policy.maxFrames ||
        s.count*s.width*s.height*4 > policy.maxDecodedBytes) throw Error('decoded sequence budget');
    const frames = [];
    let remaining = policy.maxSequenceBytes;
    // Serial fixture preload bounds in-flight memory. Larger production sequences need a windowed cache.
    for (let i=0;i<s.count;i++) {
      const path = s.template.replace('{iii}',String(i+s.start).padStart(3,'0'));
      const media = await boundedBlob(path,remaining,policy.timeoutMs);
      remaining -= media.bytes;
      const frame = new Image();
      frame.src = media.url;
      await frame.decode();
      if (frame.naturalWidth !== s.width || frame.naturalHeight !== s.height) throw Error('sequence dimensions');
      frames.push(frame);
    }
    canvas.width=s.width; canvas.height=s.height;
    const context = canvas.getContext('2d',{alpha:false});
    if (!context) throw Error('canvas unavailable');
    canvas.setAttribute('data-ready','');
    mount();
    onProgress(p => {
      const i = Math.round(p*(frames.length-1));
      if (i === evidence.drawn) return;
      context.drawImage(frames[i],0,0,canvas.width,canvas.height);
      evidence.drawn=i;
    });
  } else if (mode === 'asset') {
    asset.src=manifest.asset || manifest.poster;
    document.querySelector('#description').textContent=manifest.asset ? (manifest.assetLabel || 'Vorhandenes Einzelasset') : manifest.label;
    await asset.decode();
    evidence.source=manifest.asset || manifest.poster;
    asset.hidden=false;
    poster.style.visibility='hidden';
    animation = asset.animate([
      {transform:'translateX(-12%) rotate(-6deg) scale(.88)'},
      {transform:'translateX(12%) rotate(6deg) scale(1)'}
    ],{duration:1000,fill:'both',easing:'linear'});
    animation.pause();
    mount();
    onProgress(p => { animation.currentTime=p*1000; });
  } else fallback('unknown mode');
} catch (error) { fallback(error.message); }
