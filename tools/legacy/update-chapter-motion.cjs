const fs=require('node:fs');const file='dist/motion.js';let s=fs.readFileSync(file,'utf8');
s=s.replace('let active=false,frame=0,scanQueued=false;','let active=false,frame=0,scanQueued=false,chapters=[];');
s=s.replace("if(el.dataset.reveal==='true'&&!disabled())","if(el.matches('.st-chapter'))enterChapter(el);if(el.dataset.reveal==='true'&&!disabled())");
s=s.replace("const selectors='.st-chapter-copy,.st-chapter-visual,","const selectors='");
s=s.replace('enterHero();schedule();}',"chapters=[...main.querySelectorAll('.st-chapter')];chapters.forEach(el=>{el.classList.add('chapter-motion');watch(el)});enterHero();schedule();}");
const chapterCode=`
 function enterChapter(chapter){
  if(disabled())return;
  const direction=chapter.classList.contains('st-chapter-two')?1:-1;
  chapter.querySelectorAll('.st-chapter-copy > *').forEach((el,i)=>play(el,[{opacity:0,translate:(direction*32)+'px 14px'},{opacity:1,translate:'0 0'}],{duration:850,delay:80+i*130,fill:'both'}));
  const photo=chapter.querySelector('.st-photo');
  if(photo)play(photo,[{clipPath:'ellipse(10% 25% at 50% 50%)',scale:'1.08',opacity:.3},{clipPath:'ellipse(75% 75% at 50% 50%)',scale:'1',opacity:1}],{duration:1400,delay:100,fill:'both'});
  chapter.querySelectorAll('.st-quote,.st-handwritten').forEach(el=>play(el,[{opacity:0,translate:'0 22px',scale:'.88'},{opacity:1,translate:'0 0',scale:'1'}],{duration:1000,delay:650,fill:'both'}));
 }
`;
s=s.replace(' function enterHero(){',chapterCode+' function enterHero(){');
s=s.replace("function paint(){frame=0;const max=",`function paint(){frame=0;
  for(const chapter of chapters){
   if(!chapter.isConnected)continue;
   const rect=chapter.getBoundingClientRect(),progress=active?Math.max(0,Math.min(1,(innerHeight*.78-rect.top)/Math.max(rect.height*.8,1))):1;
   chapter.style.setProperty('--chapter-progress',progress.toFixed(3));
   chapter.style.setProperty('--chapter-shift',active?((.5-progress)*14).toFixed(2)+'px':'0px');
   chapter.classList.toggle('chapter-complete',progress>.96);
  }
  const max=`);
fs.writeFileSync(file,s);
