/* Scroll-scrubbed hero v2: device-matched frame sets, DPR canvas, eased scrub, progressive load. */
(()=>{const s=document.getElementById('scrub');if(!s)return;const rm=matchMedia('(prefers-reduced-motion: reduce)');
const st=[...s.querySelectorAll('.stage')],bar=document.getElementById('scrubp');let cur=0;
const stage=i=>{if(i===cur)return;cur=i;st.forEach((e,k)=>{e.classList.toggle('on',k===i);e.setAttribute('aria-hidden',k===i?'false':'true');e.querySelectorAll('a').forEach(a=>a.tabIndex=k===i?0:-1)})};
st.forEach((e,k)=>k&&e.querySelectorAll('a').forEach(a=>a.tabIndex=-1));
if(rm.matches){s.classList.add('still');stage(3);return}
const c=document.getElementById('scrubc'),x=c.getContext('2d',{alpha:false}),N=150;
let set='',img=[],ok=[],tgt=0,pos=0,drawn=-1,raf=0,gen=0;
const pick=()=>innerWidth/innerHeight<0.8?'m':'d';
const src=i=>'/assets/hero/'+set+'/'+String(i+1).padStart(3,'0')+'.webp';
function size(){const r=Math.min(devicePixelRatio||1,2),w=Math.round(c.clientWidth*r),h=Math.round(c.clientHeight*r);if(c.width!==w||c.height!==h){c.width=w;c.height=h;drawn=-1}x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';const p=pick();if(p!==set){set=p;img=new Array(N);ok=new Array(N).fill(false);drawn=-1;load()}kick()}
const near=i=>{for(let d=0;d<N;d++){if(ok[i-d])return i-d;if(ok[i+d])return i+d}return -1};
function paint(k){const im=img[k],W=c.width,H=c.height,sc=Math.max(W/im.naturalWidth,H/im.naturalHeight),w=im.naturalWidth*sc,h=im.naturalHeight*sc;x.drawImage(im,(W-w)/2,(H-h)/2,w,h);drawn=k;if(!s.classList.contains('live'))s.classList.add('live')}
function tick(){raf=0;pos+=(tgt-pos)*0.12;if(Math.abs(tgt-pos)<0.02)pos=tgt;const k=near(Math.round(pos));if(k>=0&&k!==drawn)paint(k);if(pos!==tgt)kick()}
const kick=()=>{if(!raf)raf=requestAnimationFrame(tick)};
function load(){const g=++gen,order=[],seen=new Set();for(const step of [8,4,2,1])for(let i=0;i<N;i+=step)if(!seen.has(i)){seen.add(i);order.push(i)}
const one=()=>{if(g!==gen||!order.length)return;const i=order.shift(),m=new Image();m.decoding='async';m.onload=()=>{const fin=()=>{if(g!==gen)return;img[i]=m;ok[i]=true;if(drawn<0||Math.abs(i-pos)<Math.abs(drawn-pos))kick();one()};m.decode?m.decode().then(fin,fin):fin()};m.onerror=one;m.src=src(i)};for(let k=0;k<4;k++)one()}
const onScroll=()=>{const r=s.getBoundingClientRect(),t=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));tgt=t*(N-1);if(bar)bar.style.transform='scaleX('+t+')';stage(t<.22?0:t<.5?1:t<.78?2:3);kick()};
addEventListener('scroll',onScroll,{passive:true});let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,150)});
rm.addEventListener?.('change',()=>location.reload());
const go=()=>{size();onScroll()};if(document.readyState!=='loading')go();else addEventListener('DOMContentLoaded',go);
})();
