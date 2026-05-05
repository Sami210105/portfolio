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
      <div className="mx-3 mt-3 border-t-2 border-l-2 border-[#555] border-b-2 border-r-2 border-b-white border-r-white bg-[#f0dfcc] p-3">
        <p className="text-[10px] text-[#555] uppercase tracking-widest mb-2 font-bold">
          Now Playing
        </p>

        {currentTrack ? (
          <>
            {/* Track Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <div
                  className={`w-12 h-12 rounded-full bg-black border-4 border-[#888] flex items-center justify-center ${
                    isPlaying ? "animate-spin [animation-duration:2s]" : ""
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-[#c0c0c0]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-[#351303]">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-[#444]">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex gap-4">
                <button
                  className="px-2 py-1 border-2 border-t-white border-l-white border-b-[#555] border-r-[#555] bg-[#9b6b53] active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white"
                  onClick={playPrev}
                >
                  ⏮
                </button>

                <button
                  className="px-2 py-1 border-2 border-t-white border-l-white border-b-[#555] border-r-[#555] bg-[#9b6b53] active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white"
                  onClick={togglePlay}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  className="px-2 py-1 border-2 border-t-white border-l-white border-b-[#555] border-r-[#555] bg-[#9b6b53] active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white"
                  onClick={playNext}
                >
                  ⏭
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs w-[35px] text-left font-mono text-[#5a3e2b]">
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
                className="flex-1 appearance-none h-2 rounded-full bg-[#d6c3a3]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#5a3e2b]
                [&::-webkit-slider-thumb]:cursor-pointer"
              />

              <span className="text-xs w-[35px] text-right font-mono text-[#5a3e2b]">
                {formatTime(duration)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#666] italic">
            — select a track to play —
          </p>
        )}
      </div>

      {/* PLAYLIST */}
      <div className="mx-3 mt-3 mb-3 border-t-2 border-l-2 border-[#555] border-b-2 border-r-2 border-b-white border-r-white overflow-y-auto max-h-[220px] bg-white">
        {PLAYLIST.map((track, i) => {
          const isActive = currentIndex === i;

          return (
            <div
              key={i}
              onClick={() => handleTrackClick(i)}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-[#ddd]
              ${isActive ? "bg-[#351303] text-[#e2c7aa]" : "hover:bg-[#e6d3b3]"}`}
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