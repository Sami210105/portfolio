export default function AchievementsTab({ activePage, setActivePage }) {
  const isActive = activePage === "achievements";
  return (
    <button
      onClick={() => setActivePage("achievements")}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150
        ${isActive ? 'text-[#e2c7aa] shadow-inner' : 'text-[#9b6b53] hover:text-[#ccc]'}`}
    >
      Achievements
    </button>
  );
}