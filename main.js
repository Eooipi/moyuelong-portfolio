// ==================== Filter Tabs ====================
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && !card.dataset.category.split(' ').includes(f));
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
  const btn = document.getElementById('globalBackToTop');
  if (btn) btn.classList.toggle('visible', y > 500);
});

// ==================== Scroll Reveal ====================
const observer = new IntersectionObserver(entries => {
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

function closeModal(e) {
  if (e && e.target !== modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
function scrollToTop() { modalOverlay.scrollTo({ top: 0, behavior: 'smooth' }); }

// ---- Data Config: 13 products, 封面.jpg as card image, NOT in modal ----
const portfolioData = {
  // 1. 跨境升降桌 (overseas)
  'desk': {
    title: '跨境升降桌', en: 'Height-Adjustable Desk',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境'],
    folder: '1.跨境升降桌',
    mainImages: Array.from({length:18},(_,i)=>`升降桌- ${i+1}.jpg`),
  },
  // 2. 人体工学椅 (domestic, GIFs)
  'ergo-chair': {
    title: '人体工学椅', en: 'Ergonomic Office Chair',
    label: 'Home Rendering / Main Image / Multi-angle',
    tags: ['国内平台','主图渲染','多角度展示','GIF动图'],
    folder: '2.人体工学椅',
    mainImages: ['人体工学椅- 1.jpg','人体工学椅- 2.jpg','人体工学椅- 3.jpg','人体工学椅- 4.jpg','人体工学椅- 5.jpg','人体工学椅- 6.jpg','人体工学椅- 7.jpg','人体工学椅- 8.jpg','人体工学椅- 9.jpg','人体工学椅- 10.gif','人体工学椅- 11.gif'],
  },
  // 3. 日式床边收纳挂篮 (domestic, detail)
  'bedside-basket': {
    title: '日式床边收纳挂篮', en: 'Japanese Bedside Storage Basket',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '3.日式床边收纳挂篮',
    mainImages: ['主图1.jpg','主图2.jpg','主图3.jpg','主图4.jpg','主图5.jpg','主图6.jpg'],
    detailImages: ['日式床边收纳篮- 1.jpg','日式床边收纳篮- 2.jpg','日式床边收纳篮- 3.jpg','日式床边收纳篮- 4.jpg','日式床边收纳篮- 5.jpg','日式床边收纳篮- 6.jpg'],
  },
  // 4. 复古敞口垃圾桶 (domestic, detail)
  'trash-can': {
    title: '复古敞口垃圾桶', en: 'Vintage Open Trash Can',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '4.复古敞口垃圾桶',
    mainImages: ['主图- 1.jpg','主图- 2.jpg','主图- 3.jpg'],
    detailImages: ['复古垃圾桶- 1.jpg','复古垃圾桶- 2.jpg','复古垃圾桶- 3.jpg','复古垃圾桶- 4.jpg','复古垃圾桶- 5.jpg','复古垃圾桶- 6.jpg','复古垃圾桶- 7.jpg','复古垃圾桶- 8.jpg','复古垃圾桶- 9.jpg'],
  },
  // 5. 桌面透明鱼缸 (domestic, detail)
  'fish-tank': {
    title: '桌面透明鱼缸', en: 'Desktop Transparent Fish Tank',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '5.桌面透明鱼缸',
    mainImages: ['主图-2.jpg','主图- 3.jpg','主图-3.jpg'],
    detailImages: ['桌面透明鱼缸- 1.jpg','桌面透明鱼缸- 2.jpg','桌面透明鱼缸- 3.jpg','桌面透明鱼缸- 4.jpg','桌面透明鱼缸- 5.jpg','桌面透明鱼缸- 6.jpg'],
  },
  // 6. 浴室置物架 (overseas, A+)
  'bathroom-shelf': {
    title: '浴室置物架', en: 'Bathroom Storage Shelf',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','Amazon'],
    folder: '6.浴室置物架',
    mainImages: ['浴室置物架- 1.jpg','浴室置物架- 2.jpg','浴室置物架- 3.jpg','浴室置物架- 4.jpg','浴室置物架- 5.jpg','浴室置物架- 6.jpg'],
    aplusImages: ['高级A+1.png','高级A+2.png','高级A+3.png','高级A+4.png'],
  },
  // 7. 防倾倒镜柜 (overseas, A+)
  'mirror-cabinet': {
    title: '防倾倒镜柜', en: 'Anti-Tip Mirror Cabinet',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','AIGC'],
    folder: '7.防倾倒镜柜',
    mainImages: ['镜柜- 1.jpg','镜柜- 2.jpg','镜柜- 3.jpg','镜柜- 4.jpg','镜柜- 5.jpg','镜柜- 6.jpg'],
    aplusImages: ['高级A+1.png','高级A+2.png','高级A+3.png','高级A+4.png'],
  },
  // 8. 四门拱形食品柜 (overseas, A+)
  'food-cabinet': {
    title: '四门拱形食品柜', en: 'Four-Door Arch Food Cabinet',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','AIGC'],
    folder: '8.四门拱形食品柜',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    aplusImages: ['高级A+1.png','高级A+2.png'],
  },
  // 9. 人体工学椅跨境 (overseas)
  'w599': {
    title: '人体工学椅跨境', en: 'W599 Cross-border Chair',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','W599'],
    folder: '9.人体工学椅跨境',
    mainImages: Array.from({length:10},(_,i)=>`W599- ${i+1}.jpg`),
  },
  // 10. 电竞椅跨境 (overseas)
  'dj08': {
    title: '电竞椅跨境', en: 'DJ08 Gaming Chair Cross-border',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','DJ08'],
    folder: '10.电竞椅跨境',
    mainImages: Array.from({length:9},(_,i)=>`DJ08- ${i+1}.jpg`),
  },
  // 11. 办公学习椅子跨境 (overseas)
  'w808': {
    title: '办公学习椅子跨境', en: 'W808 Office Chair Cross-border',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','W808'],
    folder: '11.办公学习椅子跨境',
    mainImages: ['W808- 1.jpg',...Array.from({length:8},(_,i)=>`w808- ${i+2}.jpg`)],
  },
  // 12. 椅子渲染节选 (domestic, collection)
  'chair-collection': {
    title: '椅子渲染节选', en: 'Chair Rendering Collection',
    label: 'Product Rendering / Collection / Chair',
    tags: ['国内平台','精选合集','多产品','高精渲染'],
    folder: '12.椅子渲染节选',
    mainImages: Array.from({length:14},(_,i)=>`椅子精选- ${i+1}.jpg`),
  },
  // 13. 收纳产品渲染节选 (domestic, collection)
  'collection': {
    title: '收纳产品渲染节选', en: 'Storage Product Collection',
    label: 'Product Rendering / Excerpt / Collection',
    tags: ['国内平台','精选合集','多产品','高精渲染'],
    folder: '13.收纳产品渲染节选',
    mainImages: Array.from({length:14},(_,i)=>`产品精选- ${i+1}.jpg`),
  },
};

// ---- Unified open function (封面.jpg excluded from mainImages) ----
function openProject(id) {
  const d = portfolioData[id];
  if (!d) return;

  const tagsHtml = d.tags.map(t => `<span>${t}</span>`).join('');
  const img = (src, alt) => `<img src="${d.folder}/${src}" loading="lazy" alt="${alt||d.title}">`;

  const isCollection = d.tags.includes('精选合集') || d.mainImages.length > 15;
  const gridClass = isCollection ? 'modal-grid-4' : 'modal-grid-3';

  const mainHtml = d.mainImages ? `<div class="modal-section">
    <div class="modal-section-title">Main Image / 主图展示</div>
    <div class="modal-section-sub">Product images for e-commerce listing</div>
    <div class="${gridClass}">${d.mainImages.map(s => img(s, d.title)).join('')}</div>
  </div>` : '';

  const detailHtml = d.detailImages ? `<div class="modal-section">
    <div class="modal-section-title">Details Page / 详情页设计</div>
    <div class="modal-section-sub">Full product description infographics</div>
    <div class="modal-detail-full">${d.detailImages.map(s => img(s, d.title+'详情')).join('')}</div>
  </div>` : '';

  const aplusHtml = d.aplusImages ? `<div class="modal-section">
    <div class="modal-section-title">Premium A+ / 高级A+ 内容</div>
    <div class="modal-section-sub">Amazon Premium A+ content modules</div>
    <div class="modal-aplus-grid">${d.aplusImages.map(s => img(s, d.title+' A+')).join('')}</div>
  </div>` : '';

  modalInner.innerHTML = `<div class="modal-page">
    <div class="modal-header">
      <div class="label">${d.label}</div>
      <h2>${d.title}</h2><p class="en">${d.en}</p>
      <div class="meta-tags">${tagsHtml}</div>
    </div>
    ${mainHtml}${detailHtml}${aplusHtml}
    <div class="modal-back-top"><button onclick="scrollToTop()">↑ 回到顶部</button></div>
  </div>`;

  modalOverlay.classList.add('active');
  modalOverlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

// ==================== Lightbox ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.addEventListener('click', e => {
  if (e.target.tagName === 'IMG' && e.target.closest('.modal-section')) {
    lightboxImg.src = e.target.src;
    lightbox.classList.add('active');
    e.stopPropagation();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
