import { useState, useRef } from "react";
import RetroWindow from "./RetroWindow";

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran", src: "/music/perfect.mp3" },
  { title: "Starboy", artist: "The Weeknd", src: "/music/starboy.mp3" },
  { title: "Sweater Weather", artist: "The Neighbourhood", src: "/music/sweater-weather.mp3" },
  { title: "Style", artist: "Taylor Swift", src: "/music/style.mp3" },
  { title: "Sunflower", artist: "Post Malone", src: "/music/sunflower.mp3" },
  { title: "Heat Waves", artist: "Glass Animals", src: "/music/heat-waves.mp3" },
  { title: "As It Was", artist: "Harry Styles", src: "/music/as-it-was.mp3" },
];

const Music = ({ onClose }) => {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentTrack = currentIndex !== null ? PLAYLIST[currentIndex] : null;

  const formatTime = (time) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleTrackClick = (index) => {
    if (!audioRef.current) return;

    if (currentIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    setCurrentIndex(index);
    audioRef.current.src = PLAYLIST[index].src;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const playNext = () => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % PLAYLIST.length;
    handleTrackClick(next);
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    const prev = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    handleTrackClick(prev);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <RetroWindow
      title="music.app"
      onClose={onClose}
      defaultPos={{ x: 180, y: 150 }}
    >
      <audio
        ref={audioRef}
        onEnded={playNext}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
      />

      {/* NOW PLAYING */}
      <div className="mx-3 mt-3 border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-b-[var(--window-border-light)] border-r-[var(--window-border-light)] bg-[var(--window-panel-bg)] p-3">
        <p className="text-[10px] text-[var(--window-text-secondary)] uppercase tracking-widest mb-2 font-bold">
          Now Playing
        </p>

        {currentTrack ? (
          <>
            {/* Track Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <div
                  className={`w-12 h-12 rounded-full bg-[var(--window-active-bg)] border-4 border-[var(--window-text-secondary)] flex items-center justify-center ${
                    isPlaying ? "animate-spin [animation-duration:2s]" : ""
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-[var(--window-border-light)]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-[var(--window-body-text)]">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-[var(--window-text-secondary)]">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex gap-4">
                <button
                  className="px-2 py-1 border-2 border-t-[var(--window-border-light)] border-l-[var(--window-border-light)] border-b-[var(--window-border-dark)] border-r-[var(--window-border-dark)] bg-[var(--window-button-bg)] text-[var(--window-button-text)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]"
                  onClick={playPrev}
                >
                  ⏮
                </button>

                <button
                  className="px-2 py-1 border-2 border-t-[var(--window-border-light)] border-l-[var(--window-border-light)] border-b-[var(--window-border-dark)] border-r-[var(--window-border-dark)] bg-[var(--window-button-bg)] text-[var(--window-button-text)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]"
                  onClick={togglePlay}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  className="px-2 py-1 border-2 border-t-[var(--window-border-light)] border-l-[var(--window-border-light)] border-b-[var(--window-border-dark)] border-r-[var(--window-border-dark)] bg-[var(--window-button-bg)] text-[var(--window-button-text)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]"
                  onClick={playNext}
                >
                  ⏭
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs w-[35px] text-left font-mono text-[var(--window-text-secondary)]">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
                className="flex-1 appearance-none h-2 rounded-full bg-[var(--window-track-bg)]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[var(--window-active-bg)]
                [&::-webkit-slider-thumb]:cursor-pointer"
              />

              <span className="text-xs w-[35px] text-right font-mono text-[var(--window-text-secondary)]">
                {formatTime(duration)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-xs text-[var(--window-text-secondary)] italic">
            — select a track to play —
          </p>
        )}
      </div>

      {/* PLAYLIST */}
      <div className="mx-3 mt-3 mb-3 border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-b-[var(--window-border-light)] border-r-[var(--window-border-light)] overflow-y-auto max-h-[220px] bg-[var(--window-body-bg)]">
        {PLAYLIST.map((track, i) => {
          const isActive = currentIndex === i;

          return (
            <div
              key={i}
              onClick={() => handleTrackClick(i)}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-[var(--window-border-dark)]/20
              ${isActive ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]" : "hover:bg-[var(--window-hover-bg)] text-[var(--window-body-text)]"}`}
            >
              <span className="text-xs w-4 font-mono">
                {isActive && isPlaying ? "▶" : i + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">
                  {track.title}
                </p>
                <p className="text-[10px] opacity-70">
                  {track.artist}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </RetroWindow>
  );
};

export default Music;