const {chromium}=require('C:/Users/panna/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/panna/.cache/puppeteer/chrome/win64-148.0.7778.167/chrome-win64/chrome.exe'});
 const failures=[];
 for(const width of [390,756,1440,2560]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4318/#ingredients',{waitUntil:'networkidle'});
  await page.locator('.ig4-feature').first().waitFor();
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>({vw:innerWidth,body:document.body.scrollWidth,doc:document.documentElement.scrollWidth,hero:document.querySelector('.ig4-hero').getBoundingClientRect().height,features:document.querySelectorAll('.ig4-feature').length,cards:document.querySelectorAll('.ig4-small-card').length,imgs:[...document.querySelectorAll('.ig4-feature-art')].map(e=>getComputedStyle(e).backgroundImage)}));
  if(metrics.doc>width+2||metrics.body>width+2)failures.push(`${width}px horizontal overflow ${metrics.doc}/${metrics.body}`);
  if(metrics.features!==3||metrics.cards!==4)failures.push(`${width}px missing page sections`);
  if(errors.length)failures.push(`${width}px page errors: ${errors.join('; ')}`);
  if(width===1440||width===390||width===2560)await page.screenshot({path:`C:/Users/panna/chashitsu-ingredients-v4-${width}.png`,fullPage:true});
  console.log(width,JSON.stringify(metrics));
  if(width===1440){
   await page.locator('[data-ig4-target="magnesium"]').click();
   await page.waitForTimeout(900);
   const selected=await page.locator('[data-ig4-target="magnesium"]').getAttribute('aria-pressed');
   const targetTop=await page.locator('#ig4-magnesium').evaluate(el=>el.getBoundingClientRect().top);
   if(selected!=='true'||targetTop<0||targetTop>150)failures.push('ingredient navigation did not reach Magnesium');
   await page.locator('[data-ig4-target="all"]').click();
   if(await page.locator('[data-ig4-target="all"]').getAttribute('aria-pressed')!=='true')failures.push('All navigation failed');
  }
  await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await reduced.goto('http://127.0.0.1:4318/#ingredients',{waitUntil:'networkidle'});
 if(!(await reduced.locator('html').evaluate(el=>el.classList.contains('motion-off'))))failures.push('reduced motion preference not applied');
 await reduced.locator('[data-ig4-target="magnesium"]').click();
 const targetTop=await reduced.locator('#ig4-magnesium').evaluate(el=>el.getBoundingClientRect().top);
 if(targetTop<0||targetTop>150)failures.push('reduced-motion navigation returned to the pill strip');
 await reduced.locator('.ig4-nav').scrollIntoViewIfNeeded();
 await reduced.locator('[data-ig4-next]').click();
 const right=await reduced.locator('#ig4-nav-track').evaluate(el=>el.scrollLeft);
 await reduced.locator('[data-ig4-prev]').click();
 const left=await reduced.locator('#ig4-nav-track').evaluate(el=>el.scrollLeft);
 if(left>=right)failures.push('ingredient strip backward navigation failed');
 const bodySize=await reduced.locator('.ig4-feature-copy>p').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 if(bodySize<16)failures.push('mobile body text is too small');
 await reduced.close();
 await browser.close();
 if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('Ingredients v4 checks passed');
})().catch(e=>{console.error(e);process.exitCode=1});
