import RetroWindow from "./RetroWindow";

const Connect = ({ onClose }) => {
  return (
    <RetroWindow title="connect.txt" onClose={onClose} defaultPos={{ x: 180, y: 150 }}>
      <h1 className="text-sm font-bold text-[var(--window-body-text)] ml-2 mt-1">Don't be shy, I'm friendly and would love to connect!</h1>
      <div className="flex gap-3 mt-1 mb-2 gap-4 ml-2 px-4 py-2">
        <a href="https://github.com/Sami210105" target="_blank" rel="noreferrer" className="text-sm text-[var(--window-body-text)] underline hover:text-[var(--window-accent)]"><img src="/github-icon.png" className="inline w-10 h-10 mr-1" /></a>
        <a href="mailto:samidha.dhawale@gmail.com" target="_blank" rel="noreferrer" className="text-sm text-[var(--window-body-text)] underline hover:text-[var(--window-accent)]"><img src="/gmail-icon.png" className="inline w-10 h-10 mr-1" /></a>
        <a href="https://www.linkedin.com/in/samidha-dhawale-4713b9286/" target="_blank" rel="noreferrer" className="text-sm text-[var(--window-body-text)] underline hover:text-[var(--window-accent)]"><img src="/linkedin-icon.png" className="inline w-10 h-10 mr-1" /></a>
      </div>
    </RetroWindow>
  );
};

export default Connect;