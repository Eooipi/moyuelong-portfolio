// ==================== Filter Tabs ====================
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && !card.dataset.category.split(' ').includes(filter));
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

function closeModal(e) {
  if (e && e.target !== modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function scrollToTop() { modalOverlay.scrollTo({ top: 0, behavior: 'smooth' }); }

// ---- Data Config: 15 products ----
const portfolioData = {
  // 1. 跨境升降桌 (overseas)
  'desk': {
    title: '跨境升降桌', en: 'Height-Adjustable Desk',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境'],
    folder: '1.跨境升降桌',
    mainImages: Array.from({length:19},(_,i)=>`升降桌- ${i+1}.jpg`),
  },
  // 2. 人体工学椅 (domestic, has GIFs)
  'ergo-chair': {
    title: '人体工学椅', en: 'Ergonomic Office Chair',
    label: 'Home Rendering / Main Image / Multi-angle',
    tags: ['国内平台','主图渲染','多角度展示','GIF动图'],
    folder: '2.人体工学椅',
    mainImages: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.gif','12.gif'],
  },
  // 3. 日式床边收纳挂篮 (domestic)
  'bedside-basket': {
    title: '日式床边收纳挂篮', en: 'Japanese Bedside Storage Basket',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '3.日式床边收纳挂篮',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    detailImages: ['日式床边收纳篮 - 1.png','日式床边收纳篮 - 2.png','日式床边收纳篮 - 3.png','日式床边收纳篮 - 4.png','日式床边收纳篮 - 5.png','日式床边收纳篮 - 6.png'],
  },
  // 4. 密封保鲜盒 (domestic)
  'storage-box': {
    title: '密封保鲜盒', en: 'Airtight Storage Box',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '4.密封保鲜盒',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    detailImages: ['密封保鲜盒 - 1.png','密封保鲜盒 - 2.png','密封保鲜盒 - 3.png','密封保鲜盒 - 4.png','密封保鲜盒 - 5.png','密封保鲜盒 - 6.png','密封保鲜盒 - 7.png'],
  },
  // 5. 复古敞口垃圾桶 (domestic)
  'trash-can': {
    title: '复古敞口垃圾桶', en: 'Vintage Open Trash Can',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '5.复古敞口垃圾桶',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    detailImages: ['复古敞口垃圾桶- 1.png','复古敞口垃圾桶- 2.png','复古敞口垃圾桶- 3.png','复古敞口垃圾桶- 4.png','复古敞口垃圾桶- 5.png','复古敞口垃圾桶- 6.png','复古敞口垃圾桶- 7.png','复古敞口垃圾桶- 8.png','复古敞口垃圾桶- 9.png','复古敞口垃圾桶- 10.png','复古敞口垃圾桶- 11.png','复古敞口垃圾桶- 12.png'],
  },
  // 6. 桌面透明鱼缸 (domestic)
  'fish-tank': {
    title: '桌面透明鱼缸', en: 'Desktop Transparent Fish Tank',
    label: 'Home Rendering / Details Page / Main Image',
    tags: ['国内平台','主图渲染','详情页设计','场景展示'],
    folder: '6.桌面透明鱼缸',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    detailImages: ['桌面透明鱼缸- 1.png','桌面透明鱼缸- 2.png','桌面透明鱼缸- 3.png','桌面透明鱼缸- 4.png','桌面透明鱼缸- 5.png','桌面透明鱼缸- 6.png'],
  },
  // 7. 浴室置物架 (overseas, has A+)
  'bathroom-shelf': {
    title: '浴室置物架', en: 'Bathroom Storage Shelf',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','Amazon'],
    folder: '7.浴室置物架',
    mainImages: ['浴室置物架- 1.png','浴室置物架- 2.png','浴室置物架- 3.png','浴室置物架- 4.png','浴室置物架- 5.png','浴室置物架- 6.png','浴室置物架- 7.png'],
    aplusImages: ['高级A+1.png','高级A+2.png','高级A+3.png','高级A+4.png'],
  },
  // 8. 防倾倒镜柜 (overseas, has A+)
  'mirror-cabinet': {
    title: '防倾倒镜柜', en: 'Anti-Tip Mirror Cabinet',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','AIGC'],
    folder: '8.防倾倒镜柜',
    mainImages: ['防倾倒镜柜- 1.png','防倾倒镜柜- 2.png','防倾倒镜柜- 3.png','防倾倒镜柜- 4.png'],
    aplusImages: ['高级A+1.png','高级A+2.png','高级A+3.png','高级A+4.png'],
  },
  // 9. 四门拱形食品柜 (overseas, has A+)
  'food-cabinet': {
    title: '四门拱形食品柜', en: 'Four-Door Arch Food Cabinet',
    label: 'Home Rendering / Main Image / Advanced A+',
    tags: ['海外平台','主图渲染','高级A+','AIGC'],
    folder: '9.四门拱形食品柜',
    mainImages: ['主图1.png','主图2.png','主图3.png'],
    aplusImages: ['高级A+1.png','高级A+2.png'],
  },
  // 10. 人体工学椅精选 (domestic, collection)
  'ergo-chair-pro': {
    title: '人体工学椅精选', en: 'Ergonomic Chair Collection',
    label: 'Home Rendering / Collection / Multi-angle',
    tags: ['国内平台','精选合集','主图渲染','多角度展示'],
    folder: '10.人体工学椅精选',
    mainImages: ['电竞椅精选- 1.png','电竞椅精选- 2.png',...Array.from({length:30},(_,i)=>`电竞椅精选- ${i+3}.jpg`)],
  },
  // 11. 人体工学椅跨境 (overseas)
  'w599': {
    title: '人体工学椅跨境', en: 'W599 Cross-border Chair',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','W599'],
    folder: '11.人体工学椅跨境',
    mainImages: Array.from({length:11},(_,i)=>`W599- ${i+1}.jpg`),
  },
  // 12. 电竞椅跨境 (overseas)
  'dj08': {
    title: '电竞椅跨境', en: 'DJ08 Gaming Chair Cross-border',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','DJ08'],
    folder: '12.电竞椅跨境',
    mainImages: Array.from({length:10},(_,i)=>`DJ08- ${i+1}.jpg`),
  },
  // 13. 办公学习椅子跨境 (overseas)
  'w808': {
    title: '办公学习椅子跨境', en: 'W808 Office Chair Cross-border',
    label: 'Home Rendering / Main Image / Cross-border',
    tags: ['海外平台','主图渲染','跨境','W808'],
    folder: '13.办公学习椅子跨境',
    mainImages: Array.from({length:10},(_,i)=>`W808- ${i+1}.jpg`),
  },
  // 14. 椅子渲染节选 (domestic, collection)
  'chair-collection': {
    title: '椅子渲染节选', en: 'Chair Rendering Collection',
    label: 'Product Rendering / Collection / Chair',
    tags: ['国内平台','精选合集','多产品','高精渲染'],
    folder: '14.椅子渲染节选',
    mainImages: Array.from({length:24},(_,i)=>`椅子精选- ${i+1}.jpg`),
  },
  // 15. 收纳产品渲染节选 (domestic, collection)
  'collection': {
    title: '收纳产品渲染节选', en: 'Storage Product Rendering Collection',
    label: 'Product Rendering / Excerpt / Collection',
    tags: ['国内平台','精选合集','多产品','高精渲染'],
    folder: '15.收纳产品渲染节选',
    mainImages: ['渲染节选- 1.jpg','渲染节选- 2.png','渲染节选- 3.png','渲染节选- 4.png','渲染节选- 5.png','渲染节选- 6.png','渲染节选- 7.png','渲染节选- 8.png','渲染节选- 9.png','渲染节选- 10.png','渲染节选- 11.png','渲染节选- 12.png','渲染节选- 13.png','渲染节选- 14.png','渲染节选- 15.png','渲染节选- 16.png','渲染节选- 17.png','渲染节选- 18.png','渲染节选- 19.png','渲染节选- 20.jpg','渲染节选- 21.png','渲染节选- 22.png','渲染节选- 23.png','渲染节选- 24.png','渲染节选- 25.png','渲染节选- 26.png','渲染节选- 27.png','渲染节选- 28.png','渲染节选- 29.png','渲染节选- 30.png'],
  },
};

// ---- Unified open function ----
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
    <div class="modal-section-sub">Full product description infographics — complete display</div>
    <div class="modal-detail-full">${d.detailImages.map(s => img(s, d.title + '详情')).join('')}</div>
  </div>` : '';

  const aplusHtml = d.aplusImages ? `<div class="modal-section">
    <div class="modal-section-title">Premium A+ / 高级A+ 内容</div>
    <div class="modal-section-sub">Amazon Premium A+ content modules</div>
    <div class="modal-aplus-grid">${d.aplusImages.map(s => img(s, d.title + ' A+')).join('')}</div>
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modalOverlay.classList.remove('active'); document.body.style.overflow = ''; }
});
