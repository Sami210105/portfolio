# Retro Portfolio OS

A desktop-inspired developer portfolio built with React, designed to feel like a nostalgic operating system — complete with draggable windows, system-style popups, and an interactive retro UI.

---

## Features

- **Retro Window System** — Draggable, closable, and minimizable app windows
- **Desktop Navigation** — Folder icons for About Me, Music, Connect, and Resume
- **Projects Window** — Showcases projects (Bugganizer, Carousel, Euphoria, Gameshub, Moodify, NEC, Sketch Charades) each in their own window
- **Achievements Page** — System-alert style popups highlighting milestones
- **Music Player** — Dedicated music window accessible from the desktop
- **Error Popup System** — Retro-style error/notification popups
- **Taskbar** — Bottom navigation bar with Home, Projects, and Achievements tabs

---

## Tech Stack

| Tech | Usage |
|------|-------|
| React.js | Component architecture & state management |
| Tailwind CSS | Styling & layout |
| JavaScript (ES6+) | Logic & interactivity |
| Vite | Build tool & dev server |

---

## Project Structure

```
src/
├── components/
│   ├── folders/
│   │   ├── projects/       # Individual project windows (Bugganizer, Euphoria, Moodify, etc.)
│   │   ├── Aboutme.jsx
│   │   ├── Connect.jsx
│   │   ├── ErrorPopup.jsx
│   │   ├── FolderIcon.jsx
│   │   ├── Music.jsx
│   │   ├── Resume.jsx
│   │   └── RetroWindow.jsx
│   ├── pages/
│   │   ├── AchievementsPage.jsx
│   │   ├── HomePage.jsx
│   │   └── ProjectsPage.jsx
│   ├── shared/
│   │   └── Square.jsx
│   └── taskbar/
│       ├── AchievementsTab.jsx
│       ├── HomeTab.jsx
│       ├── ProjectsTab.jsx
│       └── Taskbar.jsx
├── App.jsx
├── App.css
└── main.jsx
```

---

## Getting Started

```bash
git clone https://github.com/Sami210105/retro-portfolio-os.git
cd retro-portfolio-os
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Links

- **GitHub**: [github.com/Sami210105/portfolio](https://github.com/Sami210105/portfolio)
- **Live Demo**: *coming soon*

---

*Built by Samidha — 3rd year CS Engineering student. Fullstack developer with a thing for pixel art and retro aesthetics.*
