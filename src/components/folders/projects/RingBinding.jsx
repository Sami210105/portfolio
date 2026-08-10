export default function RingBinding({ count = 13 }) {
  return (
    <div className="absolute -left-7 top-3 bottom-3 w-10 flex flex-col justify-between z-40 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="40"
          height="24"
          viewBox="0 0 40 24"
          className="overflow-visible rotate-x-20 rotate-y-10"
        >
          <defs>
            <linearGradient
              id={`ring-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e8c79a" />
              <stop offset="30%" stopColor="#b9835a" />
              <stop offset="55%" stopColor="#7a4a26" />
              <stop offset="75%" stopColor="#5c3419" />
              <stop offset="100%" stopColor="#8a5a34" />
            </linearGradient>
          </defs>

          <path
            d="M 36 5 A 16 9 0 1 0 27 20"
            fill="none"
            stroke={`url(#ring-grad-${i})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}