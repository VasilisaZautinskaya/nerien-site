// ============================================================
//  СТАТУС СТРИМА — меняй эту строку
//  false = offline, true = live
// ============================================================
const IS_LIVE = false;

// Применяем статус
document.querySelectorAll('.live-dot').forEach(dot => {
  dot.classList.toggle('online', IS_LIVE);
});
document.querySelectorAll('.nav-live').forEach(el => {
  el.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      node.textContent = IS_LIVE ? 'Live' : 'Offline';
    }
  });
});

// ============================================================
//  ЛОАДЕР С ГЛАЗАМИ
// ============================================================
function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'eyes-loader';
  loader.id = 'eyes-loader';
  loader.innerHTML = `
    <div class="loader-eyes">
      <div class="loader-eye">
        <div class="loader-pupil loader-pupil-l" id="lpl"></div>
        <div class="loader-shine"></div>
      </div>
      <div class="loader-eye">
        <div class="loader-pupil loader-pupil-r" id="lpr"></div>
        <div class="loader-shine"></div>
      </div>
    </div>
    <div class="loader-name">Нэриэн</div>
  `;
  document.body.prepend(loader);
  return loader;
}

function movePupils(x, y) {
  const pl = document.getElementById('lpl');
  const pr = document.getElementById('lpr');
  if (pl) pl.style.transform = `translate(${x}px, ${y}px)`;
  if (pr) pr.style.transform = `translate(${x}px, ${y}px)`;
}

function runLoaderAnim(callback) {
  movePupils(0, 0);
  setTimeout(() => movePupils(-9, 0),  300);
  setTimeout(() => movePupils(9, 0),   900);
  setTimeout(() => movePupils(-6, 0),  1500);
  setTimeout(() => movePupils(0, 0),   2000);
  setTimeout(() => movePupils(0, 4),   2400);
  setTimeout(() => { if (callback) callback(); }, 2700);
}

// Показываем лоадер при входе на страницу
const loader = createLoader();

// Страница уже загружена — запускаем анимацию и скрываем лоадер
runLoaderAnim(() => {
  loader.classList.add('fade-out');
  setTimeout(() => loader.classList.add('hidden'), 450);
});

// ============================================================
//  ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ
// ============================================================
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
  if (!href.endsWith('.html') && !href.endsWith('/')) return;

  link.addEventListener('click', e => {
    e.preventDefault();

    // Создаём новый лоадер
    const exitLoader = createLoader();
    exitLoader.id = 'exit-loader';

    const pl2 = exitLoader.querySelector('.loader-pupil-l');
    const pr2 = exitLoader.querySelector('.loader-pupil-r');

    function moveExit(x, y) {
      if (pl2) pl2.style.transform = `translate(${x}px, ${y}px)`;
      if (pr2) pr2.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Короткая анимация перед уходом
    setTimeout(() => moveExit(9, 0),  200);
    setTimeout(() => moveExit(-9, 0), 700);
    setTimeout(() => moveExit(0, 0),  1100);

    setTimeout(() => {
      window.location.href = href;
    }, 1300);
  });
});

// ============================================================
//  Тема
// ============================================================
const saved = localStorage.getItem('nerian-theme') || 'dark';
document.body.classList.add(saved);

const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    document.body.classList.replace(isDark ? 'dark' : 'light', isDark ? 'light' : 'dark');
    localStorage.setItem('nerian-theme', isDark ? 'light' : 'dark');
    respawnParticles();
  });
}

// Частицы
function respawnParticles() {
  document.querySelectorAll('.particle').forEach(p => p.remove());
  spawnParticles();
}
function spawnParticles() {
  const bg = document.querySelector('.bg-layer');
  if (!bg) return;
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'particle';
    const sz = Math.random() * 2.5 + 0.8;
    s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${(Math.random()*4+2).toFixed(1)}s;animation-delay:${(Math.random()*4).toFixed(1)}s`;
    bg.appendChild(s);
  }
}
spawnParticles();

// Полоски характеристик
setTimeout(() => {
  document.querySelectorAll('.stat-fill').forEach(el => {
    el.style.width = el.dataset.w + '%';
  });
}, 400);

// Картинка персонажа
const img = document.getElementById('char-img');
const ph = document.getElementById('ph');
if (img) {
  img.onload = () => {
    if (img.naturalWidth > 0) {
      img.style.display = 'block';
      if (ph) ph.style.display = 'none';
    }
  };
  if (img.complete && img.naturalWidth > 0) {
    img.style.display = 'block';
    if (ph) ph.style.display = 'none';
  }
}

// Мобильное меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
if (burger) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    burger.classList.toggle('open', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    mobileOverlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
  mobileOverlay.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}