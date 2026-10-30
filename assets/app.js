/* v7: filters, generator, copy, sticky CTA, nav state, reveal, hero video. No dependencies. */
(()=>{const d=document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
if($('.hero'))d.body.classList.add('home');
const st=$('#stickycta'),nl=$('#newsletter');let nlv=false;
if(nl&&'IntersectionObserver'in window)new IntersectionObserver(e=>{nlv=e[0].isIntersecting;tog()}).observe(nl);
function tog(){st&&st.classList.toggle('show',scrollY>700&&!nlv)}
const nav=$('.nav');let ly=scrollY;
addEventListener('scroll',()=>{tog();const y=scrollY;if(nav){nav.classList.toggle('scrolled',y>40);if(Math.abs(y-ly)>6){nav.classList.toggle('hide',y>ly&&y>400&&!nav.contains(d.activeElement));ly=y}}},{passive:true});
const grid=$('#grid');if(grid){let f={ind:'',goal:'',q:''};const cards=$$('#grid .card');
const apply=()=>{let n=0;cards.forEach(c=>{const ok=(!f.ind||c.dataset.ind.split(' ').includes(f.ind))&&(!f.goal||c.dataset.goal===f.goal)&&(!f.q||c.dataset.text.includes(f.q));c.hidden=!ok;if(ok)n++});$('#count').textContent=n+' of '+cards.length+' formats'};
['ind','goal'].forEach(k=>$$('.filters .chip[data-'+k+']').forEach(b=>b.onclick=()=>{$$('.filters .chip[data-'+k+']').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});b.classList.add('on');b.setAttribute('aria-pressed','true');f[k]=b.dataset[k];apply()}));
$('#q').oninput=e=>{f.q=e.target.value.trim().toLowerCase();apply()};apply()}
const gf=$('#genform');if(gf){const esc=s=>s.replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');let last=-1;
gf.onsubmit=e=>{e.preventDefault();const i=$('#gind').value,g=$('#ggoal').value,nm=$('#gname').value.trim();
let pool=LRT.filter(x=>(!i||x.ind.includes(i))&&(!g||x.goal===g));let note='';if(!pool.length){pool=LRT.filter(x=>!i||x.ind.includes(i));note='<p class="small">No exact match for that goal, so here is the closest fit for your industry.</p>'}
let k;do{k=Math.floor(Math.random()*pool.length)}while(pool.length>1&&pool[k].n===last);const x=pool[k];last=x.n;
const hook=nm?x.hook.replace(/our|here|this place/i,m=>m+' at '+nm).replace('at '+nm+' at',''):x.hook;
$('#genout').innerHTML=note+'<p class="eyebrow">Your Reel idea</p><h3>'+esc(x.title)+'</h3><p class="hookq big">“'+esc(hook)+'”</p><p>'+esc(x.How)+'</p><ol>'+x.shots.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><p><b>Suno prompt idea:</b> '+esc(x.suno)+'</p><p><a class="btn sm" href="/formats/'+x.slug+'.html">Open the full template →</a> <button class="btn sm ghost" type="submit">Another idea</button></p><p class="small">Want one of these every week? <a href="#newsletter">Get the free weekly drop</a>.</p>'}}
$$('.copy').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(d.getElementById(b.dataset.copy).textContent).then(()=>{const t=b.textContent;b.textContent='Copied ✓';setTimeout(()=>b.textContent=t,1500)})});
const rm=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver'in window&&!rm.matches){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'});$$('.reveal').forEach(e=>io.observe(e));setTimeout(()=>$$('.reveal').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')}),2000)}else $$('.reveal').forEach(e=>e.classList.add('in'));
const v=d.getElementById('herov');if(v){const set=()=>{if(rm.matches){v.pause();v.removeAttribute('autoplay')}else v.play&&v.play().catch(()=>{})};rm.addEventListener?.('change',set);if(rm.matches)set();
if('IntersectionObserver'in window)new IntersectionObserver(e=>{if(rm.matches)return;e[0].isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(v)}
})();
