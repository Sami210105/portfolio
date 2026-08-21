import RetroWindow from "./RetroWindow";

const ErrorPopup = ({ achievement, onNext, onClose, isLast, defaultPos }) => {
  return (
    <RetroWindow
      title="System Alert"
      onClose={onClose}
      defaultPos={defaultPos}
      disableCenter={true}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <img src="/error.png" className="w-10" />
          <div>
            <h2 className="text-sm font-bold text-[var(--window-body-text)]">
              {achievement.title}
            </h2>
            <p className="text-xs text-[var(--window-text-secondary)] mt-1">
              {achievement.desc}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border-2 border-[var(--window-border-dark)] text-xs bg-[var(--window-body-bg)] text-[var(--window-body-text)]"
          >
            Abort
          </button>
          <button
            onClick={onNext}
            className="px-3 py-1 border-2 border-[var(--window-border-dark)] text-xs bg-[var(--window-button-bg)] text-[var(--window-button-text)]"
          >
            {isLast ? "Unlock Achievement" : "OK"}
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};

export default ErrorPopup;