export default function FolderIcon({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group"
    >
      <img
        src={icon}
        alt={label}
        className="
          w-18 h-18 object-contain
          drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]
          group-hover:scale-110
          transition-all duration-200
        "
      />

      <span className="text-sm font-mono text-center font-bold text-[var(--window-label-text)]">
        {label}
      </span>
    </div>
  );
}