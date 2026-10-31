/* Scroll-scrubbed hero v3: device frame sets, DPR canvas, eased scrub with cross-blended fractional frames. */
(()=>{const s=document.getElementById('scrub');if(!s)return;const rm=matchMedia('(prefers-reduced-motion: reduce)');
const st=[...s.querySelectorAll('.stage')],bar=document.getElementById('scrubp');let cur=0;
const stage=i=>{if(i===cur)return;cur=i;st.forEach((e,k)=>{e.classList.toggle('on',k===i);e.setAttribute('aria-hidden',k===i?'false':'true');e.querySelectorAll('a').forEach(a=>a.tabIndex=k===i?0:-1)})};
st.forEach((e,k)=>k&&e.querySelectorAll('a').forEach(a=>a.tabIndex=-1));
if(rm.matches){s.classList.add('still');stage(3);return}
const c=document.getElementById('scrubc'),x=c.getContext('2d',{alpha:false}),N=+s.dataset.frames||244,E=0.09;
let set='',img=[],ok=[],tgt=0,pos=-1,last=-9,raf=0,gen=0,run=false;
const pick=()=>innerWidth/innerHeight<0.8?'m':'d';
const src=i=>'/assets/hero/'+set+'/'+String(i+1).padStart(3,'0')+'.webp';
const near=i=>{i=Math.max(0,Math.min(N-1,i));if(ok[i])return i;for(let d=1;d<N;d++){if(ok[i-d])return i-d;if(ok[i+d])return i+d}return -1};
function size(){const r=Math.min(devicePixelRatio||1,2),w=Math.round(c.clientWidth*r),h=Math.round(c.clientHeight*r);if(c.width!==w||c.height!==h){c.width=w;c.height=h}x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';const p=pick();if(p!==set){set=p;img=new Array(N);ok=new Array(N).fill(false);load()}last=-9;kick()}
function blit(im,a){const W=c.width,H=c.height,k=Math.max(W/im.naturalWidth,H/im.naturalHeight),w=im.naturalWidth*k,h=im.naturalHeight*k;x.globalAlpha=a;x.drawImage(im,(W-w)/2,(H-h)/2,w,h)}
function paint(p){const f=Math.floor(p),fr=p-f,a=near(f),b=near(f+1);if(a<0)return false;blit(img[a],1);if(fr>0.02&&b>=0&&b!==a)blit(img[b],fr);x.globalAlpha=1;if(!s.classList.contains('live'))s.classList.add('live');return true}
function read(){const r=s.getBoundingClientRect(),t=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));tgt=t*(N-1);if(bar)bar.style.transform='scaleX('+t+')';stage(t<.22?0:t<.5?1:t<.78?2:3)}
function tick(){raf=0;read();if(pos<0)pos=tgt;else pos+=(tgt-pos)*E;if(Math.abs(tgt-pos)<0.004)pos=tgt;if(Math.abs(pos-last)>0.003){if(paint(pos))last=pos}if(pos!==tgt||run)kick()}
const kick=()=>{if(!raf)raf=requestAnimationFrame(tick)};
// keep the loop alive briefly after the last scroll/touch event (covers iOS momentum)
let idle;const wake=()=>{run=true;clearTimeout(idle);idle=setTimeout(()=>run=false,700);kick()};
function load(){const g=++gen,order=[],seen=new Set();for(const step of [8,4,2,1])for(let i=0;i<N;i+=step)if(!seen.has(i)){seen.add(i);order.push(i)}
const one=()=>{if(g!==gen||!order.length)return;const i=order.shift(),m=new Image();m.decoding='async';m.onload=()=>{const fin=()=>{if(g!==gen)return;img[i]=m;ok[i]=true;last=-9;kick();one()};m.decode?m.decode().then(fin,fin):fin()};m.onerror=one;m.src=src(i)};for(let k=0;k<6;k++)one()}
addEventListener('scroll',wake,{passive:true});addEventListener('touchmove',wake,{passive:true});addEventListener('touchend',wake,{passive:true});
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,150)});rm.addEventListener?.('change',()=>location.reload());
const go=()=>{size();read();kick()};if(document.readyState!=='loading')go();else addEventListener('DOMContentLoaded',go);
})();
