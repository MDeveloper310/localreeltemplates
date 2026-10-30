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
/* motion layer v4: Lenis inertia, masked line reveals, curtains, parallax, magnetic, cursor, smart nav. Content is visible without JS; reduced-motion skips all of it. */
(()=>{const d=document,R=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const nav=d.querySelector('.nav');let ly=scrollY;
const navTick=y=>{if(!nav)return;nav.classList.toggle('scrolled',y>40);if(Math.abs(y-ly)>6){nav.classList.toggle('hide',y>ly&&y>300&&!d.activeElement.closest?.('.nav'));ly=y}};
addEventListener('scroll',()=>navTick(scrollY),{passive:true});
if(rm)return;R.classList.add('mo');
/* split headings into masked lines */
const split=el=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(' ');return}const w=d.createElement('span');w.className='w';const i=d.createElement('span');i.className='wi';i.textContent=t;w.append(i);f.append(w)});c.replaceWith(f)}else if(c.nodeType===1&&!c.classList.contains('sr'))walk(c)})};walk(el);
 const lay=()=>{let top=null,line=-1;el.querySelectorAll('.wi').forEach(i=>{const t=i.parentNode.offsetTop;if(top===null||Math.abs(t-top)>4){line++;top=t}i.style.transitionDelay=(line*.09)+'s'})};lay();el._lay=lay};
const sp=[...d.querySelectorAll('[data-split]')];sp.forEach(split);
addEventListener('resize',()=>sp.forEach(e=>e._lay&&e._lay()));
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -12% 0px'});
d.querySelectorAll('[data-split],.curtain,.reveal,.card,.steps>div,.indgrid a,.kit section').forEach(e=>io.observe(e));
/* failsafe: never leave content hidden */
setTimeout(()=>d.querySelectorAll('[data-split],.curtain').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add('in')}),2500);
/* Lenis inertial scroll */
let lenis=null;
const startLenis=()=>{if(!window.Lenis||lenis)return;lenis=new Lenis({duration:1.15,easing:t=>1-Math.pow(1-t,4),smoothWheel:true});
 const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);
 d.querySelectorAll('a[href^="#"],a[href^="/#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href').replace(/^\//,'');if(location.pathname!=='/'&&a.getAttribute('href').startsWith('/'))return;const t=d.querySelector(h);if(t&&h.length>1){e.preventDefault();lenis.scrollTo(t,{offset:-70});history.replaceState(null,'',h)}}))};
window.Lenis?startLenis():addEventListener('load',startLenis);
/* parallax + marquee velocity */
const par=[...d.querySelectorAll('[data-par]')],mt=d.querySelector('.mtrack');let mx=0,vel=0,py=scrollY,dir=1;
const loop=()=>{const y=scrollY,dy=y-py;py=y;vel+= (dy-vel)*.1;if(dy)dir=dy>0?1:-1;
 par.forEach(e=>{const r=e.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;e.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*parseFloat(e.dataset.par)).toFixed(1)+'px')});
 if(mt){mx-=(.45+Math.min(Math.abs(vel)*.12,6))*dir;const w=mt.scrollWidth/2;if(mx<-w)mx+=w;if(mx>0)mx-=w;mt.style.transform='translate3d('+mx+'px,0,0)'}
 requestAnimationFrame(loop)};requestAnimationFrame(loop);
if(!fine)return;
/* magnetic buttons */
d.querySelectorAll('.mag,.nav .btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.translate=(x*.25)+'px '+(y*.35)+'px'});b.addEventListener('mouseleave',()=>{b.style.translate=''})});
/* custom cursor: dot + lagged ring */
const c=d.querySelector('.cur');if(!c)return;R.classList.add('hascur');const dot=c.querySelector('i'),ring=c.querySelector('b');let tx=-100,ty=-100,rx=-100,ry=-100;
addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;dot.style.transform=`translate3d(${tx}px,${ty}px,0)`},{passive:true});
d.addEventListener('mouseover',e=>c.classList.toggle('hov',!!e.target.closest('a,button,summary,select,input,label,.card')));
d.addEventListener('mouseleave',()=>c.classList.add('off'));d.addEventListener('mouseenter',()=>c.classList.remove('off'));
const cl=()=>{rx+=(tx-rx)*.16;ry+=(ty-ry)*.16;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;requestAnimationFrame(cl)};cl();
})();
/* v5 hero video: pause for reduced motion, pause offscreen */
(()=>{const v=document.getElementById('herov');if(!v)return;const mq=matchMedia('(prefers-reduced-motion: reduce)');
const set=()=>{if(mq.matches){v.pause();v.removeAttribute('autoplay')}else{v.play&&v.play().catch(()=>{})}};mq.addEventListener?.('change',set);if(mq.matches)set();
if('IntersectionObserver'in window)new IntersectionObserver(e=>{if(mq.matches)return;e[0].isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(v)})();
