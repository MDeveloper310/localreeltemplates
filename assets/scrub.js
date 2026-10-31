/* Scroll-scrubbed hero: 120 webp frames drawn to canvas. Reduced motion = poster only. */
(()=>{const s=document.getElementById('scrub');if(!s)return;const rm=matchMedia('(prefers-reduced-motion: reduce)');
const st=[...s.querySelectorAll('.stage')],bar=document.getElementById('scrubp');let cur=0;
const stage=i=>{if(i===cur)return;cur=i;st.forEach((e,k)=>{e.classList.toggle('on',k===i);e.setAttribute('aria-hidden',k===i?'false':'true');e.querySelectorAll('a').forEach(a=>a.tabIndex=k===i?0:-1)})};
st.forEach((e,k)=>k&&e.querySelectorAll('a').forEach(a=>a.tabIndex=-1));
if(rm.matches){s.classList.add('still');stage(3);return}
const c=document.getElementById('scrubc'),x=c.getContext('2d'),N=120,img=new Array(N),ok=new Array(N).fill(false);let want=0,drawn=-1,raf=0;
const src=i=>'/assets/hero/f/'+String(i+1).padStart(3,'0')+'.webp';
const size=()=>{const r=Math.min(devicePixelRatio||1,2);c.width=innerWidth*r;c.height=innerHeight*r;drawn=-1;draw()};
const near=i=>{for(let d=0;d<N;d++){if(ok[i-d])return i-d;if(ok[i+d])return i+d}return -1};
function draw(){raf=0;const k=near(want);if(k<0||k===drawn)return;const im=img[k],W=c.width,H=c.height,sc=Math.max(W/im.width,H/im.height),w=im.width*sc,h=im.height*sc;x.drawImage(im,(W-w)/2,(H-h)/2,w,h);drawn=k;s.classList.add('live')}
const load=i=>new Promise(r=>{const m=new Image();m.decoding='async';m.onload=()=>{img[i]=m;ok[i]=true;if(Math.abs(i-want)<4&&!raf)raf=requestAnimationFrame(draw);r()};m.onerror=r;m.src=src(i)});
const order=[];for(let step=16;step>=1;step=step/2|0){for(let i=0;i<N;i+=step)if(!order.includes(i))order.push(i);if(step===1)break}
let started=false;const go=async()=>{if(started)return;started=true;const q=order.slice();const work=async()=>{while(q.length)await load(q.shift())};await Promise.all([work(),work(),work(),work()])};
const onScroll=()=>{const r=s.getBoundingClientRect(),t=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));want=Math.round(t*(N-1));if(bar)bar.style.transform='scaleX('+t+')';stage(t<.2?0:t<.48?1:t<.78?2:3);if(!raf)raf=requestAnimationFrame(draw)};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',size);
rm.addEventListener?.('change',()=>location.reload());
const kick=()=>{size();go();onScroll()};
if(document.readyState==='complete')setTimeout(kick,50);else addEventListener('load',()=>setTimeout(kick,50));
['scroll','pointerdown','touchstart'].forEach(e=>addEventListener(e,go,{once:true,passive:true}));
})();
