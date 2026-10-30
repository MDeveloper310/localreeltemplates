(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const st=$('#stickycta'),nl=$('#newsletter');let nlv=false;
if(nl&&'IntersectionObserver'in window)new IntersectionObserver(e=>{nlv=e[0].isIntersecting;tog()}).observe(nl);
function tog(){st&&st.classList.toggle('show',scrollY>700&&!nlv)}addEventListener('scroll',tog,{passive:true});
const grid=$('#grid');if(grid){let f={ind:'',goal:'',q:''};const cards=$$('#grid .card');
const apply=()=>{let n=0;cards.forEach(c=>{const ok=(!f.ind||c.dataset.ind.split(' ').includes(f.ind))&&(!f.goal||c.dataset.goal===f.goal)&&(!f.q||c.dataset.text.includes(f.q));c.hidden=!ok;if(ok)n++});$('#count').textContent=n+' of '+cards.length+' formats'};
['ind','goal'].forEach(k=>$$('.filters .chip[data-'+k+']').forEach(b=>b.onclick=()=>{$$('.filters .chip[data-'+k+']').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});b.classList.add('on');b.setAttribute('aria-pressed','true');f[k]=b.dataset[k];apply()}));
$('#q').oninput=e=>{f.q=e.target.value.trim().toLowerCase();apply()};apply()}
const gf=$('#genform');if(gf){const esc=s=>s.replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');let last=-1;
gf.onsubmit=e=>{e.preventDefault();const i=$('#gind').value,g=$('#ggoal').value,nm=$('#gname').value.trim();
let pool=LRT.filter(d=>(!i||d.ind.includes(i))&&(!g||d.goal===g));let note='';if(!pool.length){pool=LRT.filter(d=>!i||d.ind.includes(i));note='<p class="small">No exact match for that goal, so here is the closest fit for your industry.</p>'}
let k;do{k=Math.floor(Math.random()*pool.length)}while(pool.length>1&&pool[k].n===last);const d=pool[k];last=d.n;
const hook=nm?d.hook.replace(/our|here|this place/i,m=>m+' at '+nm).replace('at '+nm+' at',''):d.hook;
$('#genout').innerHTML=note+'<p class="eyebrow">Your Reel idea</p><h3>'+esc(d.title)+'</h3><p class="hookq big">“'+esc(hook)+'”</p><p>'+esc(d.How)+'</p><ol>'+d.shots.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><p><b>Suno prompt idea:</b> '+esc(d.suno)+'</p><p><a class="btn sm" href="/formats/'+d.slug+'.html">Open the full template →</a> <button class="btn sm ghost" type="submit">Another idea</button></p>'}}
$$('.copy').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(document.getElementById(b.dataset.copy).textContent).then(()=>{b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy prompt',1500)})});
})();
/* cinematic scroll layer: pinned hero zoom, letterbox, parallax, pixel dissolve. Skipped for reduced motion. */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const pin=document.getElementById('pin'),tx=document.querySelector('.herotx'),reel=document.querySelector('.reel'),bars=document.querySelectorAll('.frame i'),strip=document.querySelector('.strip');
const wide=matchMedia('(min-width: 821px)');
const secs=[...document.querySelectorAll('.reveal')],items=[];
const C=s=>getComputedStyle(s).backgroundColor;
secs.forEach(s=>{const prev=s.previousElementSibling;if(!prev)return;const cv=document.createElement('canvas');cv.className='dz';cv.setAttribute('aria-hidden','true');s.prepend(cv);
 items.push({s,cv,col:prev.id==='pin'?'#2A5D91':C(prev),seed:null,done:false})});
const cell=()=>innerWidth<700?18:26;
function draw(it,p){const {cv,s}=it,w=innerWidth,h=Math.min(s.offsetHeight,innerHeight*1.2),z=cell(),cols=Math.ceil(w/z),rows=Math.ceil(h/z);
 if(cv.width!==cols||cv.height!==rows||!it.seed){cv.width=cols;cv.height=rows;cv.style.height=h+'px';it.seed=new Float32Array(cols*rows);for(let i=0;i<it.seed.length;i++){const y=Math.floor(i/cols)/rows;it.seed[i]=Math.random()*.7+y*.3}}
 const x=cv.getContext('2d');x.clearRect(0,0,cols,rows);if(p>=1){it.done=true;cv.remove();return}x.fillStyle=it.col;
 for(let i=0;i<it.seed.length;i++)if(it.seed[i]>p)x.fillRect(i%cols,(i/cols)|0,1,1)}
let tick=false;
function frame(){tick=false;const vh=innerHeight;
 if(pin&&tx&&wide.matches){const r=pin.getBoundingClientRect(),p=Math.min(Math.max(-r.top/(r.height-vh),0),1);
  tx.style.transform='scale('+(1+p*.35)+')';tx.style.opacity=1-Math.max(0,p-.45)*1.8;
  bars.forEach(b=>b.style.height=(p*13)+'vh');
  if(reel)reel.style.transform='translateY('+(-p*120)+'px) scale('+(1+p*.15)+')';if(strip)strip.style.transform='rotate(-12deg) translateX('+(-p*160)+'px)'}
 items.forEach(it=>{if(it.done)return;const r=it.s.getBoundingClientRect();const p=(vh-r.top)/(vh*.75);draw(it,Math.min(Math.max(p,0),1)*1.15)})}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',()=>{items.forEach(i=>i.seed=null);req()});frame()})();
