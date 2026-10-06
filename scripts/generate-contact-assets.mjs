// Rebuild the selected Lucide stickers and the brand's LINE QR code.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
const nodes = JSON.parse(
  await readFile(new URL('../node_modules/lucide-static/icon-nodes.json', import.meta.url)),
);
const labels = {
  apple: 'แอปเปิล',
  banana: 'กล้วย',
  cherry: 'เชอร์รี',
  citrus: 'ส้ม',
  grape: 'องุ่น',
  carrot: 'แครอต',
  salad: 'สลัด',
  broccoli: 'บรอกโคลี',
  nut: 'ถั่ว',
  wheat: 'ข้าวสาลี',
  coffee: 'กาแฟ',
  'cup-soda': 'เครื่องดื่ม',
  'glass-water': 'แก้วน้ำ',
  milk: 'นม',
  soup: 'ซุป',
  sandwich: 'แซนด์วิช',
  egg: 'ไข่',
  fish: 'ปลา',
  cookie: 'คุกกี้',
  cake: 'เค้ก',
  sprout: 'ต้นอ่อน',
  'tree-pine': 'ต้นสน',
  'tree-deciduous': 'ต้นไม้',
  trees: 'ป่าไม้',
  'flower-2': 'ดอกไม้บาน',
  clover: 'โคลเวอร์',
  feather: 'ขนนก',
  'tree-palm': 'ต้นปาล์ม',
  shell: 'เปลือกหอย',
  'mountain-snow': 'ภูเขาหิมะ',
  cloud: 'เมฆ',
  'cloud-rain': 'ฝน',
  'cloud-sun': 'แดดและเมฆ',
  rainbow: 'สายรุ้ง',
  snowflake: 'เกล็ดหิมะ',
  wind: 'สายลม',
  sunrise: 'พระอาทิตย์ขึ้น',
  sunset: 'พระอาทิตย์ตก',
  umbrella: 'ร่ม',
  'waves-horizontal': 'คลื่น',
  pill: 'แคปซูล',
  'heart-pulse': 'ชีพจร',
  activity: 'การเคลื่อนไหว',
  stethoscope: 'หูฟังแพทย์',
  thermometer: 'อุณหภูมิ',
  cross: 'สุขภาพ',
  hospital: 'โรงพยาบาล',
  'briefcase-medical': 'ปฐมพยาบาล',
  'test-tube': 'หลอดทดลอง',
  microscope: 'กล้องจุลทรรศน์',
  dumbbell: 'ดัมเบล',
  bike: 'จักรยาน',
  footprints: 'รอยเท้า',
  timer: 'จับเวลา',
  trophy: 'ถ้วยรางวัล',
  medal: 'เหรียญรางวัล',
  target: 'เป้าหมาย',
  flame: 'ไฟ',
  brain: 'สมอง',
  eye: 'ดวงตา',
  'face-slightly-smiling': 'รอยยิ้ม',
  'face-grinning': 'หัวเราะ',
  'hand-heart': 'ส่งความรัก',
  'heart-handshake': 'ความร่วมมือ',
  users: 'ผู้คน',
  'user-round': 'บุคคล',
  baby: 'เด็ก',
  accessibility: 'การเข้าถึง',
  'hand-coins': 'ความคุ้มค่า',
  'thumbs-up': 'ถูกใจ',
  gift: 'ของขวัญ',
  'shopping-bag': 'ถุงช้อปปิง',
  'shopping-cart': 'รถเข็น',
  package: 'พัสดุ',
  truck: 'รถจัดส่ง',
  store: 'ร้านค้า',
  tag: 'ป้ายสินค้า',
  'badge-check': 'รับรองแล้ว',
  'shield-check': 'การปกป้อง',
  'credit-card': 'บัตรชำระเงิน',
  phone: 'โทรศัพท์',
  'message-circle': 'ข้อความ',
  send: 'ส่ง',
  'qr-code': 'คิวอาร์โค้ด',
  camera: 'กล้อง',
  image: 'รูปภาพ',
  video: 'วิดีโอ',
  headphones: 'หูฟัง',
  music: 'ดนตรี',
  bell: 'การแจ้งเตือน',
  calendar: 'ปฏิทิน',
  clock: 'นาฬิกา',
  'map-pin': 'หมุดแผนที่',
  compass: 'เข็มทิศ',
  plane: 'เครื่องบิน',
  'book-open': 'หนังสือ',
  pencil: 'ดินสอ',
  lightbulb: 'ไอเดีย',
  gem: 'อัญมณี',
  crown: 'มงกุฎ',
};
function path([tag, a]) {
  if (tag === 'path') return a.d;
  if (tag === 'line') return `M${a.x1} ${a.y1}L${a.x2} ${a.y2}`;
  if (tag === 'polyline' || tag === 'polygon')
    return 'M' + a.points + (tag === 'polygon' ? 'Z' : '');
  if (tag === 'circle' || tag === 'ellipse') {
    const x = +a.cx,
      y = +a.cy,
      rx = +(a.r || a.rx),
      ry = +(a.r || a.ry);
    return `M${x - rx} ${y}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
  }
  if (tag === 'rect') {
    const x = +(a.x || 0),
      y = +(a.y || 0),
      w = +a.width,
      h = +a.height,
      r = Math.min(+(a.rx || a.ry || 0), w / 2, h / 2);
    return r
      ? `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${2 * r - w}a${r} ${r} 0 0 1 ${-r} ${-r}v${2 * r - h}a${r} ${r} 0 0 1 ${r} ${-r}Z`
      : `M${x} ${y}h${w}v${h}h${-w}Z`;
  }
  throw new Error('Unsupported SVG primitive: ' + tag);
}
if (Object.keys(labels).length !== 100) throw new Error('Expected 100 stickers');
const library = Object.fromEntries(
  Object.entries(labels).map(([key, label]) => {
    if (!nodes[key]) throw new Error('Missing Lucide icon: ' + key);
    return ['lucide-' + key, { label, path: nodes[key].map(path).join(' ') }];
  }),
);
await writeFile(
  new URL('../src/shared/sticker-library.json', import.meta.url),
  JSON.stringify(library, null, 2) + '\n',
);
await mkdir(new URL('../public/assets/licenses/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../node_modules/lucide-static/LICENSE', import.meta.url),
  new URL('../public/assets/licenses/lucide.txt', import.meta.url),
);
await QRCode.toFile(
  fileURLToPath(new URL('../public/assets/line-oa-qr.png', import.meta.url)),
  'https://lin.ee/SVyOMJG',
  {
    width: 480,
    margin: 4,
    errorCorrectionLevel: 'M',
    color: { dark: '#152d4e', light: '#ffffff' },
  },
);
console.log('Generated 100 Lucide stickers and LINE OA QR code');
