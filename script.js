/**
 * Web Portfolio - Google Antigravity Edition
 * Interactive Engine, Search, Modal, and 2D Physics Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSpaceCanvas();
  initTypewriter();
  initSearch();
  initProjectFilters();
  initContactForm();
  initPhysicsEngine();
});

/* ===================================================================
   1. Theme Management (Dark / Light)
   =================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  }

  toggleBtn?.addEventListener('click', () => {
    if (document.body.classList.contains('theme-dark')) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });
}

/* ===================================================================
   2. Space Canvas Stars Particle Effect
   =================================================================== */
function initSpaceCanvas() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((width * height) / 9000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.2 + 0.05
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.classList.contains('theme-light');
    const starColor = isLight ? 'rgba(70, 90, 140, ' : 'rgba(255, 255, 255, ';

    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = starColor + star.alpha + ')';
      ctx.fill();

      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
    }
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
}

/* ===================================================================
   3. Typewriter Effect
   =================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Web Developer & IT Student',
    'Sripatum University (ID: 68105308)',
    'HTML • CSS • JavaScript • Bootstrap',
    'PHP • Python • Django • SQL/MySQL'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   4. Google Search & Live Filter
   =================================================================== */
const searchIndex = [
  { title: 'HTML & CSS', category: 'Frontend Skill', link: '#skills' },
  { title: 'JavaScript & Bootstrap', category: 'Frontend Skill', link: '#skills' },
  { title: 'PHP & Python', category: 'Backend Skill', link: '#skills' },
  { title: 'Django Framework', category: 'Backend Skill', link: '#skills' },
  { title: 'SQL & MySQL', category: 'Database Skill', link: '#skills' },
  { title: 'Sripatum University (มหาวิทยาลัยศรีปทุม)', category: 'Education', link: '#experience' },
  { title: 'ปัณณธร เพชรทอง (Pannathorn)', category: 'Profile', link: '#about' },
  { title: 'รหัสนักศึกษา 68105308', category: 'Student ID', link: '#about' },
  { title: 'Django & Python Web Application', category: 'Project', link: '#projects' },
  { title: 'PHP & MySQL Management Portal', category: 'Project', link: '#projects' },
  { title: 'Interactive Portfolio & Antigravity', category: 'Project', link: '#projects' },
  { title: 'Pannathon7111@gmail.com', category: 'Contact', link: '#contact' },
  { title: '🚀 Antigravity Zero-G Mode', category: 'Easter Egg', action: 'antigravity' }
];

function initSearch() {
  const searchInput = document.getElementById('portfolio-search');
  const clearBtn = document.getElementById('clear-search');
  const dropdown = document.getElementById('search-results-dropdown');
  const searchBtn = document.getElementById('btn-search-go');
  const luckyBtn = document.getElementById('btn-feeling-lucky');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length > 0) {
      clearBtn.classList.remove('hidden');
      const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );
      renderSearchResults(matches);
    } else {
      clearBtn.classList.add('hidden');
      dropdown.classList.add('hidden');
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    dropdown.classList.add('hidden');
    searchInput.focus();
  });

  searchBtn.addEventListener('click', () => {
    const val = searchInput.value.trim();
    if (val) {
      const match = searchIndex.find(i => i.title.toLowerCase().includes(val.toLowerCase()));
      if (match && match.link) {
        document.querySelector(match.link)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // "I'm Feeling Lucky" launches Antigravity Mode!
  luckyBtn?.addEventListener('click', () => {
    triggerAntigravityMode();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.google-search-box')) {
      dropdown?.classList.add('hidden');
    }
  });
}

function renderSearchResults(results) {
  const dropdown = document.getElementById('search-results-dropdown');
  if (!dropdown) return;

  if (results.length === 0) {
    dropdown.innerHTML = '<div class="search-result-item" style="color:var(--text-muted); cursor:default;">No matching results found</div>';
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = results.map(item => `
    <div class="search-result-item" data-action="${item.action || ''}" data-link="${item.link || ''}">
      <span class="search-result-title">${item.title}</span>
      <span class="search-result-type">${item.category}</span>
    </div>
  `).join('');

  dropdown.classList.remove('hidden');

  dropdown.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      const link = item.getAttribute('data-link');
      dropdown.classList.add('hidden');

      if (action === 'antigravity') {
        triggerAntigravityMode();
      } else if (link) {
        document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===================================================================
   5. Project Filters & Modals
   =================================================================== */
const projectData = {
  1: {
    title: 'Django & Python Web Application',
    category: 'Full Stack Web',
    year: '2026',
    desc: 'ระบบเว็บแอปพลิเคชันฟูลสแตกพัฒนาด้วย Python & Django Framework เชื่อมต่อและจัดการฐานข้อมูล MySQL พร้อมระบบยืนยันตัวตนและการจัดการสิทธิ์ผู้ใช้งาน ตกแต่งหน้าบ้านด้วย Bootstrap 5 สวยงามและ Responsive',
    features: [
      'สถาปัตยกรรม MTV (Model-Template-View) ของ Django Framework',
      'ระบบบริหารจัดการข้อมูล เชื่อมต่อและทำงานร่วมกับฐานข้อมูล MySQL',
      'ระบบ Authentication และ User Permissions ปลอดภัย',
      'ออกแบบหน้าตาเว็บไซต์ด้วย Bootstrap 5 รองรับทั้งคอมพิวเตอร์และมือถือ'
    ],
    tech: ['Python', 'Django', 'SQL/MySQL', 'Bootstrap', 'HTML5', 'CSS3']
  },
  2: {
    title: 'PHP & MySQL Management Portal',
    category: 'Backend & Database',
    year: '2025',
    desc: 'ระบบจัดการฐานข้อมูลและเว็บไซต์แบบไดนามิก พัฒนาด้วย PHP และ MySQL รองรับการทำ CRUD เต็มรูปแบบ เชื่อมต่อฐานข้อมูลอย่างปลอดภัย และแสดงผลสวยงามด้วย Bootstrap',
    features: [
      'เชื่อมต่อฐานข้อมูล MySQL ด้วย PDO และ Prepared Statements ป้องกัน SQL Injection',
      'ระบบ CRUD (Create, Read, Update, Delete) ครบวงจรและมีประสิทธิภาพ',
      'ระบบค้นหาและกรองข้อมูลแบบไดนามิก',
      'UI ดีไซน์สะอาดตา ตอบสนองรวดเร็วด้วย Bootstrap และ JavaScript'
    ],
    tech: ['PHP', 'SQL/MySQL', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3']
  },
  3: {
    title: 'Interactive Portfolio & Antigravity',
    category: 'Creative Web',
    year: '2026',
    desc: 'เว็บไซต์พอร์ตโฟลิโอส่วนตัวเชิงโต้ตอบพร้อมระบบจำลองฟิสิกส์ 2D Google Antigravity พัฒนาด้วย HTML, CSS, JavaScript และ Bootstrap',
    features: [
      'ระบบจำลองฟิสิกส์ 2D Rigid-Body Simulation 60 FPS ด้วย Pure JavaScript',
      'ฟังก์ชันจับและเหวี่ยงวัตถุตามแรงโมเมนตัม (Interactive Drag & Toss)',
      'โหมดสลับแรงโน้มถ่วง: Earth, Zero-G, Reverse Gravity และระเบิดคลื่น Shockwave',
      'ระบบค้นหา Google Search Filter และ Dark/Light Mode Switcher'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Physics Math']
  }
};

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Close Setup
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');

  modalClose?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

window.openProjectModal = function(id) {
  const data = projectData[id];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span class="category-pill">${data.category}</span> • <span class="year-pill">${data.year}</span>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-top: 8px;">${data.title}</h2>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${data.desc}</p>
    
    <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px;">✨ Key Features:</h4>
    <ul style="padding-left: 20px; margin-bottom: 24px; color: var(--text-secondary);">
      ${data.features.map(f => `<li style="margin-bottom: 6px;">${f}</li>`).join('')}
    </ul>

    <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px;">🛠️ Tech Stack:</h4>
    <div class="card-stack" style="margin-bottom: 24px;">
      ${data.tech.map(t => `<span style="padding: 5px 10px; font-size: 0.82rem;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 12px;">
      <a href="https://github.com" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1; justify-content:center;">Source Code</a>
      <button class="btn btn-secondary" onclick="document.getElementById('project-modal').classList.add('hidden');">Close</button>
    </div>
  `;

  modal.classList.remove('hidden');
};

/* ===================================================================
   6. Contact Form
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('form-toast');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;

    toast.textContent = `🎉 Thank you, ${name}! Your message has been received. I'll get back to you shortly.`;
    toast.className = 'form-toast success';
    toast.classList.remove('hidden');

    form.reset();

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  });
}

/* ===================================================================
   7. Google Antigravity Physics Engine (2D Rigid Body Simulation)
   =================================================================== */
let physicsActive = false;
let physicsBodies = [];
let animFrameId = null;
let currentGravity = { x: 0, y: 0.5 }; // Earth default
let mouseConstraint = { isDragging: false, body: null, offsetX: 0, offsetY: 0, lastX: 0, lastY: 0, vx: 0, vy: 0 };

function initPhysicsEngine() {
  // Bind trigger buttons
  const triggerBtn = document.getElementById('trigger-antigravity');
  const luckyBtn = document.getElementById('btn-feeling-lucky');
  const footerBtn = document.getElementById('footer-antigravity');
  const restoreBtn = document.getElementById('btn-reset-gravity');
  const earthBtn = document.getElementById('btn-grav-earth');
  const zeroBtn = document.getElementById('btn-grav-zero');
  const invertBtn = document.getElementById('btn-grav-invert');
  const shockBtn = document.getElementById('btn-shockwave');

  triggerBtn?.addEventListener('click', triggerAntigravityMode);
  footerBtn?.addEventListener('click', triggerAntigravityMode);
  restoreBtn?.addEventListener('click', restoreNormalLayout);

  earthBtn?.addEventListener('click', () => {
    setGravityMode('earth', earthBtn);
  });
  zeroBtn?.addEventListener('click', () => {
    setGravityMode('zero', zeroBtn);
  });
  invertBtn?.addEventListener('click', () => {
    setGravityMode('invert', invertBtn);
  });
  shockBtn?.addEventListener('click', triggerShockwave);

  // Global mouse / touch interaction for physics drag
  window.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  window.addEventListener('touchstart', handleTouchStart, { passive: false });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('touchend', handlePointerUp);
}

function setGravityMode(mode, btnEl) {
  document.querySelectorAll('.hud-controls .hud-btn').forEach(b => {
    if (b.id.startsWith('btn-grav-')) b.classList.remove('active');
  });
  btnEl?.classList.add('active');

  if (mode === 'earth') {
    currentGravity = { x: 0, y: 0.5 };
  } else if (mode === 'zero') {
    currentGravity = { x: 0, y: 0 };
  } else if (mode === 'invert') {
    currentGravity = { x: 0, y: -0.45 };
  }
}

function triggerAntigravityMode() {
  if (physicsActive) return;
  physicsActive = true;

  // Show HUD
  const hud = document.getElementById('antigravity-hud');
  hud?.classList.remove('hidden');

  // Disable scroll & add class
  document.body.classList.add('antigravity-active');

  // Capture all physics-items
  const items = document.querySelectorAll('.physics-item');
  physicsBodies = [];

  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    
    // Save original position & styling for clean restoration
    el._origStyle = {
      position: el.style.position,
      top: el.style.top,
      left: el.style.left,
      width: el.style.width,
      transform: el.style.transform,
      zIndex: el.style.zIndex
    };

    // Fix element width & height to avoid collapsing
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;

    const body = {
      el: el,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * -4 - 1, // small initial hop
      angle: 0,
      vAngle: (Math.random() - 0.5) * 0.08,
      mass: (rect.width * rect.height) / 1000,
      restitution: 0.65, // bounciness
      friction: 0.985
    };

    physicsBodies.push(body);
  });

  // Start physics tick loop
  lastTime = performance.now();
  runPhysicsLoop();
}

function restoreNormalLayout() {
  if (!physicsActive) return;
  physicsActive = false;

  if (animFrameId) cancelAnimationFrame(animFrameId);

  // Hide HUD
  document.getElementById('antigravity-hud')?.classList.add('hidden');
  document.body.classList.remove('antigravity-active');

  // Smoothly restore elements back to original layout
  physicsBodies.forEach(b => {
    const el = b.el;
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';
    el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';

    setTimeout(() => {
      if (el._origStyle) {
        el.style.position = el._origStyle.position;
        el.style.top = el._origStyle.top;
        el.style.left = el._origStyle.left;
        el.style.width = el._origStyle.width;
        el.style.transform = el._origStyle.transform;
        el.style.zIndex = el._origStyle.zIndex;
        el.style.transition = '';
      }
    }, 650);
  });

  physicsBodies = [];
}

function triggerShockwave() {
  if (!physicsActive) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  physicsBodies.forEach(b => {
    const dx = (b.x + b.width / 2) - centerX;
    const dy = (b.y + b.height / 2) - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const force = 30 / (dist * 0.02 + 1);
    b.vx += (dx / dist) * force;
    b.vy += (dy / dist) * force - 5;
    b.vAngle += (Math.random() - 0.5) * 0.3;
  });
}

/* ===================================================================
   Physics Update Loop
   =================================================================== */
let lastTime = 0;

function runPhysicsLoop() {
  if (!physicsActive) return;

  const viewW = window.innerWidth;
  const viewH = window.innerHeight;

  physicsBodies.forEach(b => {
    // If being dragged by mouse, update according to mouse
    if (mouseConstraint.isDragging && mouseConstraint.body === b) {
      b.x = mouseConstraint.lastX - mouseConstraint.offsetX;
      b.y = mouseConstraint.lastY - mouseConstraint.offsetY;
      b.vx = mouseConstraint.vx;
      b.vy = mouseConstraint.vy;
    } else {
      // Apply gravity
      b.vx += currentGravity.x;
      b.vy += currentGravity.y;

      // Apply air friction
      b.vx *= b.friction;
      b.vy *= b.friction;
      b.vAngle *= b.friction;

      // Update position & rotation
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.vAngle;

      // Collisions with viewport boundaries
      // Floor
      if (b.y + b.height > viewH) {
        b.y = viewH - b.height;
        b.vy = -b.vy * b.restitution;
        b.vx *= 0.95; // floor friction
        b.vAngle *= 0.92;
      }
      // Ceiling
      if (b.y < 0) {
        b.y = 0;
        b.vy = -b.vy * b.restitution;
      }
      // Right Wall
      if (b.x + b.width > viewW) {
        b.x = viewW - b.width;
        b.vx = -b.vx * b.restitution;
      }
      // Left Wall
      if (b.x < 0) {
        b.x = 0;
        b.vx = -b.vx * b.restitution;
      }
    }

    // Apply CSS Transform
    b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px) rotate(${b.angle}rad)`;
    b.el.style.top = '0px';
    b.el.style.left = '0px';
  });

  animFrameId = requestAnimationFrame(runPhysicsLoop);
}

/* ===================================================================
   Mouse / Pointer Handling for Physics Drag & Throw
   =================================================================== */
function handlePointerDown(e) {
  if (!physicsActive) return;

  const targetEl = e.target.closest('.physics-item');
  if (!targetEl) return;

  const body = physicsBodies.find(b => b.el === targetEl);
  if (!body) return;

  mouseConstraint.isDragging = true;
  mouseConstraint.body = body;
  mouseConstraint.offsetX = e.clientX - body.x;
  mouseConstraint.offsetY = e.clientY - body.y;
  mouseConstraint.lastX = e.clientX;
  mouseConstraint.lastY = e.clientY;
  mouseConstraint.vx = 0;
  mouseConstraint.vy = 0;

  body.el.classList.add('is-dragging');
}

function handlePointerMove(e) {
  if (!physicsActive || !mouseConstraint.isDragging) return;

  mouseConstraint.vx = (e.clientX - mouseConstraint.lastX) * 0.75;
  mouseConstraint.vy = (e.clientY - mouseConstraint.lastY) * 0.75;
  mouseConstraint.lastX = e.clientX;
  mouseConstraint.lastY = e.clientY;
}

function handlePointerUp() {
  if (!physicsActive || !mouseConstraint.isDragging) return;

  if (mouseConstraint.body) {
    mouseConstraint.body.el.classList.remove('is-dragging');
    // impart spin based on throw velocity
    mouseConstraint.body.vAngle = (mouseConstraint.vx * 0.02);
  }

  mouseConstraint.isDragging = false;
  mouseConstraint.body = null;
}

function handleTouchStart(e) {
  if (!physicsActive) return;
  const touch = e.touches[0];
  handlePointerDown({
    target: e.target,
    clientX: touch.clientX,
    clientY: touch.clientY
  });
}

function handleTouchMove(e) {
  if (!physicsActive || !mouseConstraint.isDragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  handlePointerMove({
    clientX: touch.clientX,
    clientY: touch.clientY
  });
}
