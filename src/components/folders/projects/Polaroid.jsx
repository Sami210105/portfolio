const ROTATIONS = ["-6deg", "4deg"];

export default function Polaroid({ src, alt, index }) {
  return (
    <div
      style={{
        transform: `rotate(${ROTATIONS[index % ROTATIONS.length]})`,
        marginTop: index === 1 ? "28px" : "0px",
        marginLeft: index === 1 ? "-18px" : "0px",
      }}
      className="relative bg-white border-4 border-white shadow-[0_4px_10px_rgba(0,0,0,0.35)] w-[190px]"
    >
      <div
        style={{ transform: `translateX(-50%) rotate(${index === 0 ? "-4deg" : "3deg"})` }}
        className="absolute -top-3 left-1/2 w-14 h-6 bg-[#c9b18f]/80 border border-[#9b6b53]/40"
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-[130px] object-cover bg-[#d6c3a3]"
      />
    </div>
  );
}