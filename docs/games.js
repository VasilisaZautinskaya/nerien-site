// ============================================================
//  ИГРЫ — редактируй только этот блок
//
//  status:
//    "played"  — уже играл на стриме
//    "playing" — сейчас играю
//    "planned" — планирую сыграть
//    "fav"     — любимые вне стримов
//
//  genre: жанр (необязательно, можно убрать или оставить "")
//  note:  короткая заметка (необязательно)
// ============================================================

const GAMES = [
    // --- Уже играл на стриме ---
    {
        title: 'Detroit: Become Human',
        genre: 'Narrative / Adventure',
        note: '',
        status: 'played',
    },
    {
        title: 'Cyberpunk 2077: Phantom Liberty',
        genre: 'Action RPG',
        note: '',
        status: 'played',
    },
    {
        title: "Baldur's Gate 3",
        genre: 'CRPG',
        note: '',
        status: 'played',
    },

    // --- Сейчас играю ---
    {
        title: 'Stardew Valley',
        genre: 'Farming Sim',
        note: '',
        status: 'playing',
    },
    {
        title: 'Terraria',
        genre: 'Sandbox / Adventure',
        note: '',
        status: 'playing',
    },
    {
        title: 'Heroes of Might and Magic III',
        genre: 'Turn-based Strategy',
        note: 'Классика.',
        status: 'playing',
    },
    {
        title: 'Divinity: Original Sin II',
        genre: 'CRPG',
        note: '',
        status: 'playing',
    },

    // --- Планирую ---
    {
        title: 'Pathfinder: Wrath of the Righteous',
        genre: 'CRPG',
        note: '',
        status: 'planned',
    },
    {
        title: 'Resident Evil',
        genre: 'Survival Horror',
        note: '',
        status: 'planned',
    },
    {
        title: 'REPO',
        genre: 'Co-op Horror',
        note: '',
        status: 'planned',
    },

    // --- Любимые вне стримов ---
    {
        title: 'Diablo II: Lord of Destruction',
        genre: 'Action RPG',
        note: 'Бессмертная классика.',
        status: 'fav',
    },
    {
        title: 'Heroes of Might and Magic V',
        genre: 'Turn-based Strategy',
        note: '',
        status: 'fav',
    },
    {
        title: 'Morrowind',
        genre: 'RPG',
        note: '',
        status: 'fav',
    },
    {
        title: 'Oblivion',
        genre: 'RPG',
        note: '',
        status: 'fav',
    },
    {
        title: 'Skyrim',
        genre: 'RPG',
        note: '',
        status: 'fav',
    },
];

// ============================================================
//  Конфиг категорий — менять не нужно, разве что иконки/названия
// ============================================================

const CATEGORIES = [
    {status: 'playing', label: 'Сейчас играю', icon: '▶', badge: 'badge-playing'},
    {status: 'played', label: 'Играл на стриме', icon: '✓', badge: 'badge-played'},
    {status: 'planned', label: 'Планирую сыграть', icon: '◎', badge: 'badge-planned'},
    {status: 'fav', label: 'Любимые вне стримов', icon: '✦', badge: 'badge-fav'},
];

// ============================================================
//  Генерация страницы — не трогай
// ============================================================

const container = document.getElementById('games-sections');

CATEGORIES.forEach(cat => {
    const games = GAMES.filter(g => g.status === cat.status);
    if (!games.length) return;

    const section = document.createElement('div');
    section.className = 'games-section';

    const head = document.createElement('div');
    head.className = 'section-head';
    head.innerHTML = `
    <span class="section-icon">${cat.icon}</span>
    <span class="section-name">${cat.label}</span>
    <span class="section-line"></span>
    <span class="section-count">${games.length} ${games.length === 1 ? 'игра' : games.length < 5 ? 'игры' : 'игр'}</span>
  `;

    const grid = document.createElement('div');
    grid.className = 'games-grid';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = `game-card ${game.status}`;
        card.innerHTML = `
      <div class="game-title">${game.title}</div>
      ${game.genre ? `<div class="game-genre">${game.genre}</div>` : ''}
      ${game.note ? `<div class="game-note">${game.note}</div>` : ''}
      <div class="game-badge ${cat.badge}">${cat.label}</div>
    `;
        grid.appendChild(card);
    });

    section.appendChild(head);
    section.appendChild(grid);
    container.appendChild(section);
});
