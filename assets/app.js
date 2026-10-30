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
