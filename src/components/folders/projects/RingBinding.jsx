export default function RingBinding({ count = 13 }) {
  return (
    <div className="absolute -left-6 top-3 bottom-3 w-10 flex flex-col justify-between z-40 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="40"
          height="24"
          viewBox="0 0 40 24"
          className="overflow-visible rotate-x-20 rotate-y-10"
        >
          <path
            d="M 42 4 A 15 9 0 1 0 23 23"
            fill="none"
            stroke="#8B5A2B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}
