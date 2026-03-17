// ============================================================
//  СТАТУС СТРИМА — меняй эту строку
//  false = offline, true = live
// ============================================================
const IS_LIVE = false;

// Применяем статус ко всем индикаторам на странице
document.querySelectorAll('.live-dot').forEach(dot => {
  dot.classList.toggle('online', IS_LIVE);
});
document.querySelectorAll('.nav-live').forEach(el => {
  // Ищем только текстовый узел (не span с точкой)
  el.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      node.textContent = IS_LIVE ? 'Live' : 'Offline';
    }
  });
});

// ============================================================
//  Тема: загружаем сохранённую или ставим тёмную по умолчанию
// ============================================================
const saved = localStorage.getItem('nerian-theme') || 'dark';
document.body.classList.add(saved);

// Кнопка переключения
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  document.body.classList.replace(isDark ? 'dark' : 'light', isDark ? 'light' : 'dark');
  localStorage.setItem('nerian-theme', isDark ? 'light' : 'dark');
  respawnParticles();
});

// Частицы/звёзды
function respawnParticles() {
  document.querySelectorAll('.particle').forEach(p => p.remove());
  spawnParticles();
}

function spawnParticles() {
  const bg = document.querySelector('.bg-layer');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'particle';
    const sz = Math.random() * 2.5 + 0.8;
    s.style.cssText = `
      width: ${sz}px;
      height: ${sz}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --d: ${(Math.random() * 4 + 2).toFixed(1)}s;
      animation-delay: ${(Math.random() * 4).toFixed(1)}s;
    `;
    bg.appendChild(s);
  }
}

spawnParticles();

// Анимация полосок
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