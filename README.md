# CHASHITSU Supplement Website

เว็บไซต์สินค้าและระบบแก้ไขเนื้อหา แยก source code ออกจากไฟล์ build

## โครงสร้างโปรเจกต์

| โฟลเดอร์             | หน้าที่                                                    |
| -------------------- | ---------------------------------------------------------- |
| `src/templates/`     | HTML เว็บไซต์และ Website Studio                            |
| `src/site/`          | หน้า Home, สินค้า, Story, Origins, Ingredients และ Contact |
| `src/editor/`        | จัดการสินค้า แบรนด์ Contact เอฟเฟกต์ และฉบับร่าง           |
| `src/shared/`        | ข้อมูลสินค้าเริ่มต้น ไอคอน และรายละเอียดสินค้า             |
| `src/runtime/`       | นำข้อมูลที่บันทึกมาแสดงบนเว็บไซต์และตัวอย่างใน editor      |
| `src/styles/editor/` | CSS ระบบจัดการ                                             |
| `src/styles/site/`   | CSS หน้าร้าน                                               |
| `worker/`            | API, authentication, validation และการบันทึกข้อมูล         |
| `db/`, `drizzle/`    | schema และ migrations ของ D1                               |
| `public/assets/`     | รูปภาพและเอกสารประกอบ                                      |
| `scripts/`           | คำสั่ง build, dev และรายการไฟล์ frontend                   |
| `tests/`             | ทดสอบ API, editor และหน้าสินค้า                            |
| `tools/legacy/`      | สคริปต์สร้างภาพ/ปรับหน้าในอดีต ไม่ใช้ในการ build ปัจจุบัน  |
| `dist/`              | ผลลัพธ์จาก build สร้างใหม่ได้ ไม่ต้องแก้โดยตรง             |

## เริ่มใช้งาน

ใช้ Node.js 22 หรือใหม่กว่า:

```sh
npm ci
npm run build
npm run db:local
npm run dev
```

เปิดเว็บไซต์ที่ `http://127.0.0.1:4319/` และ editor ที่ `/editor.html#home`.
หลังแก้ source รัน `npm run build` อีกครั้งเพื่อปรับไฟล์ที่ preview ใช้

Editor ต้องมี identity headers จาก Sites และ `EDITOR_OWNER_EMAIL` ที่ตรงกัน
สคริปต์ dev ใช้เจ้าของทดสอบ `owner@example.test`; browser tests ส่ง headers สำหรับ local เท่านั้น
อย่าเปิด dev server สู่ภายนอกหรือใช้ identity จำลองกับ production

## ส่วนที่แก้บ่อย

- ชื่อ โลโก้ และ Contact: หน้าจัดการใน Website Studio
- รูป ราคา รายละเอียด FAQ และ PDF: หน้าจัดการสินค้า
- จัดการสินค้า: `src/editor/product-catalog.js` และ `product-manager.js`
- หน้าสินค้า: `src/site/product-page.js`
- Contact: `src/editor/contact-manager.js` และ `src/site/contact-page.js`
- ตรวจข้อมูลก่อนบันทึก: `worker/validation.js`
- อ่าน/เขียนฉบับร่าง: `worker/storage.js`; เส้นทาง API อยู่ใน `worker/index.js`

เนื้อหาที่แก้ไขจริงเก็บใน D1 และไฟล์อัปโหลดเก็บใน R2 ไม่อยู่ใน Git repository นี้
ข้อมูลเริ่มต้นบางรายการอ้างอิงจากแบบที่ใช้พัฒนา และแก้ไขได้จากหน้าจัดการสินค้า

## Build และทดสอบ

```sh
npm run format
npm run build
npm run test:unit
```

`scripts/frontend-files.json` จับคู่ source กับชื่อไฟล์ปลายทางเพื่อคง URL เดิม
Backend bundle ด้วย esbuild; frontend โหลดสคริปต์ตามลำดับใน template
Ingredients หลายรุ่นเป็นชั้นการปรับหน้าตามแบบเดิม ยังโหลดตามลำดับเพื่อรักษาหน้าปัจจุบัน

Browser tests ใช้ Playwright, Chrome และ local preview พอร์ต 4319
รัน `npx playwright install chromium` ก่อนใช้ browser tests แล้วรันทีละไฟล์เพราะใช้ฐานข้อมูล local เดียวกัน
หากใช้ Chrome ที่ติดตั้งเอง กำหนด environment `CHROME_PATH` เป็นพาธโปรแกรม

## เผยแพร่

โปรเจกต์ใช้ Sites, Cloudflare Worker, D1 และ R2
`.openai/hosting.json` ระบุ Site เดิม ใช้ workflow ของ Sites เผยแพร่ผล build
ตั้ง `EDITOR_OWNER_EMAIL` ผ่าน environment ของ hosting ห้าม commit secrets
การ push GitHub เก็บ source code ส่วนเผยแพร่เว็บไซต์เป็นอีกขั้นตอนหนึ่ง
