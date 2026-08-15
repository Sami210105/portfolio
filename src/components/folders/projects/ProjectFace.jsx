import Polaroid from "./Polaroid";

export default function ProjectFace({ project }) {
  return (
    <div className="w-full h-full min-h-0 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-2 p-2 md:p-4 overflow-hidden">

      {/* POLAROIDS */}
      <div className="relative min-h-0 flex items-start justify-center">
        {project.images.map((src, i) => (
          <Polaroid
            key={i}
            src={src}
            alt={project.title}
            index={i}
          />
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="min-h-0 flex flex-col justify-center items-center gap-2 border-l-2 border-dashed border-[#9b6b53]/40 pl-2 ml-16">

        {/* TITLE */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-xl font-bold text-[#351303]">
            {project.title}
          </h2>

          {project.tag && (
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#c05754] text-[#c05754] font-bold">
              {project.tag}
            </span>
          )}
        </div>

        {/* PAPER */}
        <div
          className="relative w-[350px] h-[320px] flex flex-col justify-center bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/projects/note.svg')",
            backgroundSize: "140% 140%",
          }}
        >
          <div className="px-16 py-12">
            <p className="text-sm text-[#573c27] leading-relaxed">
              {project.pitch}
            </p>

            <ul className="mt-4 text-xs text-[#573c27] list-disc pl-4 space-y-0.5">
              {project.metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* TECH */}
        <div className="flex gap-2 flex-wrap justify-center">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 bg-[#573c27] text-[#e2c7aa] border border-black"
            >
              {t}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold px-3 py-1.5 border-2 border-black bg-[#e2c7aa] text-[#351303] hover:bg-[#d6b892] transition-colors"
          >
            GitHub
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold px-3 py-1.5 border-2 border-black bg-[#351303] text-[#e2c7aa] hover:bg-[#573c27] transition-colors"
          >
            Live demo
          </a>
        </div>

      </div>
    </div>
  );
}