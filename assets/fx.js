/* fx v1: site-wide reveals, parallax, flip cards, carousel, magnetic buttons, cursor glow, filter animation. */
(()=>{const d=document,$$=(s,r=d)=>[...r.querySelectorAll(s)],rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
d.documentElement.classList.add('fx');
// auto reveal: sections + cards everywhere
const R=$$('main h2, main .card, main .vcard, main .ccard, main .lede, main .bento>div, main .steps>div, main .tool, main .plx p, main section>.wrap>p.eyebrow, .trustin li, main .slide').filter(e=>!e.closest('.scrub')&&!e.classList.contains('reveal'));
if(!rm&&'IntersectionObserver'in window){R.forEach((e,i)=>{e.classList.add('rv');e.style.setProperty('--rd',(i%4)*70+'ms')});const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -6% 0px'});R.forEach(e=>io.observe(e))}
// flip cards
$$('.flip').forEach(f=>{const t=()=>{const on=f.classList.toggle('flipped');f.setAttribute('aria-pressed',on)};f.addEventListener('click',e=>{if(!e.target.closest('a'))t()});f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
// carousel
$$('.carsec').forEach(sec=>{const car=sec.querySelector('.car');sec.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>car.scrollBy({left:b.dataset.dir*car.clientWidth*.8,behavior:rm?'auto':'smooth'}));
$$('.sbtn',car).forEach(b=>b.onclick=()=>{const sl=b.parentNode,x=sl.querySelector('.sx'),open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',open);x.hidden=!open;sl.classList.toggle('open',open);if(open)sl.scrollIntoView({inline:'center',block:'nearest',behavior:rm?'auto':'smooth'})})});
// filter animation: animate cards that become visible
if(!rm&&'MutationObserver'in window){const mo=new MutationObserver(ms=>ms.forEach(m=>{const t=m.target;if(!t.hidden&&t.classList){t.classList.remove('pop');void t.offsetWidth;t.classList.add('pop')}}));$$('#grid .card, .vcard, .ccard, [data-niches], [data-cat]').forEach(c=>mo.observe(c,{attributes:true,attributeFilter:['hidden']}))}
if(rm)return;
// parallax
const P=$$('.plx img');if(P.length){let q=0;const up=()=>{q=0;const h=innerHeight;P.forEach(im=>{const r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>h)return;const t=(r.top+r.height/2-h/2)/h;im.style.transform='translate3d(0,'+(t*-14).toFixed(2)+'%,0) scale(1.18)'})};addEventListener('scroll',()=>{if(!q)q=requestAnimationFrame(up)},{passive:true});up()}
if(!fine)return;
// magnetic buttons
$$('.btn, .cbtn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+'px)'});b.addEventListener('pointerleave',()=>b.style.transform='')});
// cursor glow + card spotlight
const g=d.querySelector('.glow');let gx=0,gy=0,gq=0;
addEventListener('pointermove',e=>{gx=e.clientX;gy=e.clientY;if(!gq)gq=requestAnimationFrame(()=>{gq=0;if(g){g.style.transform='translate3d('+gx+'px,'+gy+'px,0)';g.classList.add('on')}})},{passive:true});
d.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card,.vcard,.ccard,.flip .ff,.slide,.toolcard,.tcard');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
})();
