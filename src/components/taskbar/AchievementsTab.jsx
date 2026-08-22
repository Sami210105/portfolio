export default function AchievementsTab({ activePage, setActivePage }) {
  const isActive = activePage === "achievements";
  return (
    <button
      onClick={() => setActivePage("achievements")}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150 border-b-2
        ${isActive
          ? 'text-[var(--window-header-text)] border-[var(--window-header-text)] shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]'
          : 'text-[var(--window-header-text)] border-transparent'}`}
    >
      Achievements
    </button>
  );
}