// ============================================================
//  РАСПИСАНИЕ — редактируй только этот блок
//  days: пн=0, вт=1, ср=2, чт=3, пт=4, сб=5, вс=6
//
//  status:
//    "active"  — стримлю обычно
//    "maybe"   — иногда бывает
//    "off"     — выходной
//
//  time: во сколько примерно (можно написать что угодно)
//  label: короткая пометка (необязательно, можно убрать)
// ============================================================

const SCHEDULE = [
  {
    day: 'Пн',
    status: 'active',
    time: 'Вечером',
    label: 'стрим',
  },
  {
    day: 'Вт',
    status: 'maybe',
    time: 'Иногда',
    label: null,
  },
  {
    day: 'Ср',
    status: 'off',
    time: null,
    label: null,
  },
  {
    day: 'Чт',
    status: 'maybe',
    time: 'Иногда',
    label: null,
  },
  {
    day: 'Пт',
    status: 'maybe',
    time: 'Иногда',
    label: null,
  },
  {
    day: 'Сб',
    status: 'active',
    time: 'Вечером',
    label: 'стрим',
  },
  {
    day: 'Вс',
    status: 'active',
    time: 'Вечером',
    label: 'стрим',
  },
];

// Заметка внизу — редактируй как хочешь
const SCHEDULE_NOTE = 'Расписание примерное — время может плавать. Анонсы стримов появляются в Twitch и TikTok заранее. Если день помечен пунктиром — возможно, но не факт.';

// ============================================================
//  Дальше не трогай — это генерация страницы
// ============================================================

const grid = document.getElementById('schedule-grid');
const noteEl = document.getElementById('schedule-note-text');

// Определяем сегодняшний день (0=пн по нашей логике)
const today = (new Date().getDay() + 6) % 7; // JS: вс=0, пн=1 → перевод в пн=0

if (noteEl) noteEl.textContent = SCHEDULE_NOTE;

if (grid) {
  SCHEDULE.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = `day-card ${item.status}${i === today ? ' today' : ''}`;

    const statusText = {
      active: 'Стримлю',
      maybe: 'Иногда',
      off: 'Выходной',
    }[item.status];

    card.innerHTML = `
      <div class="day-name">${item.day}${i === today ? ' · сегодня' : ''}</div>
      <div class="day-status">${statusText}</div>
      ${item.time ? `<div class="day-time">${item.time}</div>` : ''}
      ${item.label ? `<div class="day-badge ${item.status === 'maybe' ? 'maybe-badge' : ''}">${item.label}</div>` : ''}
    `;

    grid.appendChild(card);
  });
}
