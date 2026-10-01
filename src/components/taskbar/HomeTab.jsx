export default function HomeTab({ activePage, setActivePage }) {
  const isActive = activePage === "home";
  return (
    <button
      onClick={() => setActivePage("home")}
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150 border-b-2
        ${isActive
          ? 'text-[var(--window-header-text)] border-[var(--window-header-text)] shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]'
          : 'text-[var(--window-header-text)] border-transparent'}`}
    >
      <span className="hidden sm:inline">Home</span>
    </button>
  );
}