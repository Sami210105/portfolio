export default function ProjectsTab({ activePage, setActivePage }) {
  const isActive = activePage === "projects";
  return (
    <button
      onClick={() => setActivePage("projects")}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150
        ${isActive ? 'text-[var(--window-header-text)] shadow-inner' : 'text-[var(--window-text-secondary)] hover:text-[var(--window-header-text)]'}`}
    >
      Projects
    </button>
  );
}