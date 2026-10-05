const fs=require('node:fs');const f='verify-ingredients-v3.cjs';let s=fs.readFileSync(f,'utf8');s=s.replace(/if\(width===1024\|\|width===390\)await p\.screenshot\([^;]+;/,'');fs.writeFileSync(f,s);
