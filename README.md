# supplement

เว็บไซต์หลัก CHASHITSU สำหรับผู้เข้าชม แยกจากระบบหลังบ้าน `supplement-admin-site`

| โปรเจกต์ | ตำแหน่ง | Local URL |
| --- | --- | --- |
| เว็บหลัก | `C:\Godenray_Project\supplement` | http://127.0.0.1:4319/ |
| Website Studio และ CMS API | `C:\Godenray_Project\supplement-admin-site` | http://127.0.0.1:4320/ |

ใช้ Node.js 24.x รันแต่ละโปรเจกต์ใน terminal แยกกัน
บน PowerShell ที่ปิดการรัน `.ps1` ใช้ `npm.cmd` แทน `npm`

```sh
cd C:\Godenray_Project\supplement
npm ci
npm run build
npm run dev
```

ต้องเปิด `supplement-admin-site` ด้วยเพื่ออ่านข้อมูลที่เผยแพร่และไฟล์อัปโหลด
ตั้งค่า `CONTENT_ORIGIN` ใน `.env` หากเปลี่ยน URL หลังบ้าน (ค่า dev เริ่มต้น `http://127.0.0.1:4320`)
หลังแก้ source ให้รัน `npm run build` อีกครั้ง

## โครงสร้าง

- `src/site/`, `src/templates/index.html`, `src/styles/site/`: หน้าเว็บสำหรับผู้เข้าชม
- `src/runtime/`: แสดงเนื้อหาที่เผยแพร่ สินค้า แบรนด์ และเอฟเฟกต์สำหรับผู้เข้าชมเท่านั้น
- `src/shared/`: ข้อมูลเริ่มต้นและรูปแบบข้อมูลที่หน้าเว็บใช้
- `public/assets/`: รูปภาพและไฟล์สาธารณะเดิม
- `worker/index.js`: ให้บริการ assets และ proxy เฉพาะ `GET/HEAD /api/content` กับ `/media/*`
- `scripts/build.mjs`, `scripts/dev.mjs`, `wrangler.json`: build และ dev ของเว็บหลัก

เว็บหลักไม่มีหน้า `editor.html` หรือ API สำหรับแก้ไขข้อมูล ไม่มี dependency ต่อโฟลเดอร์ source ของหลังบ้าน
ข้อมูลที่เผยแพร่และสื่ออัปโหลดอ่านผ่าน HTTP หรือ Worker service binding เท่านั้น
หลังบ้านมีสำเนา `src/shared/` ของตัวเองสำหรับข้อมูลเริ่มต้นและการตรวจสอบ schema;
หากแก้รูปแบบข้อมูลร่วมกัน ให้ปรับทั้งสองโปรเจกต์ให้ตรงกัน

โค้ด preview/editor และไฟล์สำรองของการแยกโปรเจกต์อยู่ใน `C:\Godenray_Project\supplement-admin-site` เท่านั้น
เว็บหลักโหลด `content-runtime.js` ซึ่งอ่านข้อมูลที่เผยแพร่ผ่าน `/api/content` ไม่มีโหมดแก้ไขหรือรับข้อความสั่งแก้ DOM จาก iframe

## ตรวจสอบ

```sh
npm test
npm run build
# เปิด dev server ก่อนทดสอบการแสดงผลใน browser
npm run test:browser
```

Browser tests ใช้ Chromium ของ Playwright หรือกำหนด `CHROME_PATH` เป็น Chrome ที่ติดตั้งอยู่

## Hosting

การแยกครั้งนี้ทำเฉพาะ local ไม่ได้เปลี่ยน deployment บน Sites หรือย้ายข้อมูล production
เก็บ project ID ของเว็บหลักเดิมไว้ใน `.openai/hosting.json`
เมื่อนำขึ้นระบบจริง ให้ตั้ง `CONTENT_ORIGIN` เป็น URL ที่ให้บริการ published content ได้
หรือกำหนด `CONTENT_SERVICE` เป็น Worker service binding ไปยังหลังบ้าน
ถ้าหลังบ้านเป็น private ให้ใช้ service binding ที่เข้าถึงได้จาก Worker แทน URL ที่ต้องล็อกอิน
ไม่ต้องกำหนด D1/R2 ให้เว็บหลัก; ฐานข้อมูลและสื่อเป็นหน้าที่ของหลังบ้าน
หลังบ้านที่ใช้ `STUDIO_DATABASE=supabase` ใช้ Supabase และ private Storage ของตัวเอง ไม่ต้องผูก D1/R2 บน Vercel
# Vercel deployment

ตั้ง Framework เป็น **Other**, Node.js **24.x**, Build Command `npm run build`, Output Directory `dist/vercel-public` โดยมี `vercel.json` ให้แล้ว
เมื่อ import `https://github.com/SeriusDev888/Supplement` ให้ใช้ Root Directory `./` เพราะโค้ดหน้าบ้านอยู่ที่ root ของ repo อยู่แล้ว
ตั้ง `CONTENT_ORIGIN` ตาม `.env.production.example` เป็น HTTPS URL ของ Supplement AdminSite
เว็บใช้ Vercel Function อ่าน published content และสื่อจากหลังบ้าน ส่วนไฟล์เว็บเสิร์ฟจาก static output ไม่ต้องใช้ Supabase key บนหน้าบ้าน
รัน `npm run test:vercel` เพื่อตรวจการเชื่อมต่อและการไม่ส่งต่อ cookie/credentials ไปหลังบ้าน

```dotenv
CONTENT_ORIGIN=https://YOUR_SUPPLEMENT_ADMIN.vercel.app
```

ใส่ค่าใน Vercel → Project Settings → Environment Variables → Production แล้ว redeploy
AdminSite ต้องออนไลน์และให้เข้าถึง published content/media API ได้ ไม่ใช้ `localhost` หรือ `127.0.0.1` เป็นปลายทางบน Production
หลังได้ URL หน้าบ้าน ให้ตั้ง `SITE_ORIGIN` ของ Supplement AdminSite เป็น URL หน้าบ้านนั้นแล้วรีสตาร์ท/redeploy หลังบ้าน
