# 🚀 Web Portfolio (Google Antigravity Edition)

เว็บพอร์ตโฟลิโอส่วนตัวดีไซน์ระดับพรีเมียม สไตล์ Modern Tech & Google Ecosystem พร้อมไฮไลต์พิเศษ **ระบบฟิสิกส์ Google Antigravity แบบ Interactive 2D Physics** ที่สามารถจับ โยน และเปลี่ยนแรงโน้มถ่วงของ UI elements ได้อย่างสมจริง!

---

## ✨ คุณสมบัติเด่น (Key Features)

1. **🚀 Google Antigravity Mode (Easter Egg ฟิสิกส์ 2D)**
   - กดปุ่ม **"Antigravity"** หรือคลิก **"I'm Feeling Lucky"** เพื่อเข้าสู่โหมดไร้แรงโน้มถ่วง
   - ทุกกล่องเนื้อหา (Cards, Search bar, Profile, Tags) จะกลายเป็นวัตถุฟิสิกส์ที่ร่วงหล่น กลิ้ง ชนขอบจอได้
   - **Interactive Drag & Toss:** ใช้เมาส์หรือนิ้วสัมผัสจับการ์ดแล้วเหวี่ยงขว้างด้วยแรงโมเมนตัม
   - **HUD Controls:**
     - 🌍 **Earth:** แรงโน้มถ่วงโลกปกติ
     - 🌌 **Zero-G:** สภาพไร้น้ำหนัก ลอยเคว้งกลางอวกาศ
     - 🎈 **Reverse:** แรงโน้มถ่วงกลับทิศ ลอยขึ้นเพดาน
     - 💥 **Shockwave:** ระเบิดคลื่นผลักกระจายทุกชิ้นส่วน
     - 🔄 **Restore Layout:** ประกอบชิ้นส่วนทุกอย่างกลับสู่เลย์เอาต์หน้าเว็บตามเดิมแบบนุ่มนวล

2. **🔍 Google-Style Search Filter**
   - แถบค้นหาอินเทอร์แอคทีฟสไตล์ Google Search
   - พิมพ์คำค้นหา เช่น `React`, `Python`, `Projects`, `Skills`, `AI` เพื่อกรองและกระโดดไปยังส่วนที่ต้องการแบบ Real-time

3. **🎨 Glassmorphism & Theme Toggle**
   - รองรับ **Dark Mode** (Default โทน Cosmos สบายตา) และ **Light Mode**
   - ใช้เฉดสีเอกลักษณ์ของ Google (น้ำเงิน `#4285F4`, แดง `#EA4335`, เหลือง `#FBBC05`, เขียว `#34A853`)

4. **📱 Responsive & Fully Structured Sections**
   - **Hero Section:** Avatar เรืองแสง, Typewriter text เคลื่อนไหว, ปุ่ม Quick Action
   - **About Me:** ประวัติย่อ, ไฮไลต์จุดเด่น, เคาน์เตอร์สถิติ (Stats counter)
   - **Skills & Tech Stack:** แยกหมวดหมู่ Frontend, Backend, Tools & AI พร้อมแท็กที่ตอบสนองต่อการชี้
   - **Featured Projects:** การ์ดโปรเจกต์พร้อมตัวกรองหมวดหมู่ และหน้าต่าง Modal ดูรายละเอียดแบบเจาะลึก
   - **Career & Education Timeline:** ไทม์ไลน์ประวัติการทำงานและการศึกษา
   - **Contact Form:** ฟอร์มส่งข้อความพร้อมแจ้งเตือนสถานะสำเร็จ (Toast Feedback)

---

## 📂 โครงสร้างไฟล์ (File Structure)

```
web-portfolio-antigravity/
├── index.html     # โครงสร้างหน้าเว็บ Semantic HTML5 และ Markup ทั้งหมด
├── style.css      # สไตล์ CSS, ธีมสี Google, Responsive Layout, แอนิเมชัน
├── script.js      # ระบบค้นหา, ระบบธีม, Modal และ 2D Rigid Body Physics Engine
└── README.md      # คู่มือการใช้งานและการปรับแต่ง
```

---

## 🚀 วิธีเปิดใช้งาน (How to Run)

คุณสามารถเปิดใช้งานได้ง่ายๆ ทันทีโดยไม่ต้องลงไลบรารีภายนอก:

### วิธีที่ 1: ดับเบิลคลิกไฟล์โดยตรง
- ไปที่โฟลเดอร์ `C:\Users\User\.gemini\antigravity\scratch\web-portfolio-antigravity`
- ดับเบิลคลิกที่ไฟล์ **`index.html`** เพื่อเปิดบน Google Chrome, Edge หรือเบราว์เซอร์ใดก็ได้

### วิธีที่ 2: รันผ่าน Local Server (แนะนำ)
หากมี Python ติดตั้งอยู่ สามารถเปิด terminal ในโฟลเดอร์นี้แล้วรัน:
```bash
python -m http.server 3000
```
จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## 🛠️ วิธีปรับแต่งเป็นข้อมูลของคุณเอง (How to Customize)

1. **ชื่อและข้อมูลโปรไฟล์ (`index.html`)**:
   - ค้นหา `Thanapat` แล้วเปลี่ยนเป็นชื่อของคุณ
   - ค้นหาคำใน `#typewriter` หรือแก้ไขใน `script.js` เพื่อเปลี่ยนตำแหน่งงาน
2. **โปรเจกต์ของคุณ (`script.js` & `index.html`)**:
   - แก้ไขข้อมูลใน Object `projectData` ใน `script.js` เพื่อใส่รูปภาพ, คำอธิบาย, ลิงก์ GitHub หรือ Demo จริง
3. **ทักษะ (`skills`)**:
   - เพิ่ม/ลบแท็กในส่วน `<div class="skill-tags">` ใน `index.html`
4. **ช่องทางติดต่อ (`contact`)**:
   - แก้ไขอีเมล, เบอร์โทร, ลิงก์ LinkedIn, GitHub ในส่วน Contact Section
