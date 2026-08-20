import RetroWindow from "./RetroWindow";

const Resume = ({ onClose }) => {
  return (
    <RetroWindow title="resume.txt" onClose={onClose} defaultPos={{ x: 160, y: 150 }}>
      <div className="p-2 flex flex-col">
        <h1 className="text-sm font-bold text-[var(--window-body-text)]">My Resume - The boring but important file!</h1>
        <a href="/CV.pdf" target="_blank" rel="noreferrer" className="text-sm text-[var(--window-body-text)] underline hover:text-[var(--window-accent)]"><img src="/resume.png" alt="Resume" className="w-15 h-auto hover:scale-110 transition-transform ml-7" /></a>
        <button onClick={() => window.open('/CV.pdf', '_blank')} className="bg-[var(--window-button-bg)] w-30 text-xs text-[var(--window-button-text)] mt-2 border-2 border-[var(--window-border-light)] hover:opacity-90 transition-opacity px-2 py-1">Preview Resume</button>
      </div>
    </RetroWindow>
  );
};

export default Resume;