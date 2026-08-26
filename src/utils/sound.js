const cache = {};

export const playSound = (src, volume = 0.5) => {
  if (!cache[src]) {
    cache[src] = new Audio(src);
  }
  const audio = cache[src].cloneNode();
  audio.volume = volume;
  audio.play().catch(() => {});
};