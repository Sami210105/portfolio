export default function RingBinding({ count = 13 }) {
  return (
    <div className="absolute -left-4 top-3 bottom-3 w-9 flex flex-col justify-between z-40 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative w-9 h-5">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(160deg, #e8c79a 0%, #b9835a 28%, #7a4a26 55%, #5c3419 75%, #8a5a34 100%)",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.5), 1px 2px 3px rgba(0,0,0,0.4)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{ inset: "5px 9px", background: "#f0dfcc" }}
          />
        </div>
      ))}
    </div>
  );
}