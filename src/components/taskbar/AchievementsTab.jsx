export default function AchievementsTab({ activePage, setActivePage }) {
  const isActive = activePage === "achievements";
  return (
    <button
      onClick={() => setActivePage("achievements")}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150
        ${isActive ? 'text-[var(--window-header-text)] shadow-inner' : 'text-[var(--window-text-secondary)] hover:text-[var(--window-header-text)]'}`}
    >
      Achievements
    </button>
  );
}