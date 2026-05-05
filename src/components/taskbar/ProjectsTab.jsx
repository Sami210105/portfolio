export default function ProjectsTab({ activePage, setActivePage }) {
  const isActive = activePage === "projects";
  return (
    <button
      onClick={() => setActivePage("projects")}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-150
        ${isActive ? 'text-[#e2c7aa] shadow-inner' : 'text-[#9b6b53] hover:text-[#ccc]'}`}
    >
      Projects
    </button>
  );
}