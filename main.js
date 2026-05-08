// ==================== Filter Tabs ====================
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      if (filter === 'all' || card.dataset.category.split(' ').includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==================== Navigation Hide/Show ====================
let lastScroll = 0;
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastScroll && y > 200) nav.classList.add('nav-hidden');
  else nav.classList.remove('nav-hidden');
  lastScroll = y;
});

// ==================== Scroll Reveal ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==================== Mobile Menu ====================
function toggleMobileMenu() {
  document.getElementById('navbar').classList.toggle('nav-active');
}

// ==================== Modal System ====================
const modalOverlay = document.getElementById('modalOverlay');
const modalInner = document.getElementById('modalInner');

// ==================== Modal: PDF-style Product Detail Page ====================
function closeModal(e) {
  if (e && e.target !== modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0 }); // Reset scroll
}

function scrollToTop() {
  modalOverlay.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Domestic Detail Page Layout (folders 3,4,5,6) ----
function openModal(title, en, folder) {
  const m = [], d = [];
  for (let i = 1; i <= 3; i++) m.push(`${folder}/主图${i}.webp`);
  for (let i = 1; i <= 4; i++) {
    d.push(`${folder}/详情页${i}.webp`);
    d.push(`${folder}/详情页${i}-1.webp`);
  }

  let h = `<div class="modal-page">
    <div class="modal-header">
      <div class="label">Home Rendering / Details Page / Main Image</div>
      <h2>${title}</h2>
      <p class="en">${en}</p>
      <div class="meta-tags"><span>国内平台</span><span>主图渲染</span><span>详情页设计</span><span>场景展示</span></div>
    </div>`;

  // Main Images section
  h += `<div class="modal-section">
    <div class="modal-section-title">Main Image / 主图展示</div>
    <div class="modal-section-sub">Product main images — square crop for e-commerce listing</div>
    <div class="modal-grid-3">`;
  m.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title}">`;
  });
  h += `</div></div>`;

  // Detail Pages — full width, no cropping, like PDF
  h += `<div class="modal-section">
    <div class="modal-section-title">Details Page / 详情页设计</div>
    <div class="modal-section-sub">Full product description infographics — complete scroll display</div>
    <div class="modal-detail-full">`;
  d.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title} 详情页">`;
  });
  h += `</div></div>`;

  // Back to top
  h += `<div class="modal-back-top"><button onclick="scrollToTop()">↑ 回到顶部</button></div></div>`;

  modalInner.innerHTML = h;
  modalOverlay.classList.add('active');
  modalOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

// ---- Overseas Simple Layout (folders 1, 2) ----
function openModalSimple(title, en, folder, count) {
  const ext = '.webp';
  const prefix = folder.includes('2.') ? '升降桌 - ' : '';
  const imgs = [];
  for (let i = 1; i <= count; i++) {
    imgs.push(`${folder}/${prefix}${i}${ext}`);
  }

  let h = `<div class="modal-page">
    <div class="modal-header">
      <div class="label">Home Rendering / Main Image / Multi-angle</div>
      <h2>${title}</h2>
      <p class="en">${en}</p>
      <div class="meta-tags"><span>海外平台</span><span>主图渲染</span><span>多角度展示</span></div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Main Image / 主图渲染</div>
      <div class="modal-section-sub">Product rendering — multiple angles for e-commerce listing</div>
      <div class="modal-grid-3">`;
  imgs.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title}">`;
  });
  // GIF
  if (folder.includes('1.')) {
    h += `<img src="${folder}/12.gif" loading="lazy" onerror="this.remove()"alt="${title} 动图">`;
  }
  h += `</div></div>
    <div class="modal-back-top"><button onclick="scrollToTop()">↑ 回到顶部</button></div></div>`;

  modalInner.innerHTML = h;
  modalOverlay.classList.add('active');
  modalOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

// ---- Overseas A+ Layout (folders 8, 9, 10) ----
function openModalAplus(title, en, folder) {
  const m = [], a = [];
  for (let i = 1; i <= 3; i++) m.push(`${folder}/主图${i}.webp`);
  for (let i = 1; i <= 4; i++) a.push(`${folder}/高级A+${i}.webp`);

  let h = `<div class="modal-page">
    <div class="modal-header">
      <div class="label">Home Rendering / Main Image / Advanced A+</div>
      <h2>${title}</h2>
      <p class="en">${en}</p>
      <div class="meta-tags"><span>海外平台</span><span>主图渲染</span><span>高级A+</span><span>Amazon</span></div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Main Image / 主图渲染</div>
      <div class="modal-section-sub">Product hero images for Amazon listing</div>
      <div class="modal-grid-3">`;
  m.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title}">`;
  });
  h += `</div></div>
    <div class="modal-section">
      <div class="modal-section-title">Premium A+ / 高级A+ 内容</div>
      <div class="modal-section-sub">Amazon Premium A+ content modules — feature banners & comparison charts</div>
      <div class="modal-aplus-grid">`;
  a.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title} A+">`;
  });
  h += `</div></div>
    <div class="modal-back-top"><button onclick="scrollToTop()">↑ 回到顶部</button></div></div>`;

  modalInner.innerHTML = h;
  modalOverlay.classList.add('active');
  modalOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

// ---- Collection/Compilation Layout (folder 7) ----
function openModalCollection(title, en, folder) {
  const imgs = [];
  for (let i = 1; i <= 8; i++) { imgs.push(`${folder}/${i}.webp`); }
  for (let i = 1; i <= 19; i++) { imgs.push(`${folder}/新名字 - ${i}.webp`); }
  imgs.push(`${folder}/7807瑜伽收纳筐.webp`, `${folder}/pet透明手提整理箱.webp`);

  let h = `<div class="modal-page">
    <div class="modal-header">
      <div class="label">Product Rendering / Excerpt / Collection</div>
      <h2>${title}</h2>
      <p class="en">${en}</p>
      <div class="meta-tags"><span>精选合集</span><span>多产品</span><span>高精渲染</span><span>场景展示</span></div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Rendering Collection / 渲染作品精选</div>
      <div class="modal-section-sub">A curated selection of high-quality 3D product renderings across multiple home furnishing categories</div>
      <div class="modal-grid-3">`;
  imgs.forEach(src => {
    h += `<img src="${src}" loading="lazy" onerror="this.remove()"alt="${title}">`;
  });
  h += `</div></div>
    <div class="modal-back-top"><button onclick="scrollToTop()">↑ 回到顶部</button></div></div>`;

  modalInner.innerHTML = h;
  modalOverlay.classList.add('active');
  modalOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

// Keyboard close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modalOverlay.classList.remove('active'); document.body.style.overflow = ''; }
});