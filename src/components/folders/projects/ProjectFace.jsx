import Polaroid from "./Polaroid";

export default function ProjectFace({ project }) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 p-6 md:p-8">
      <div className="relative flex items-start justify-center pt-4">
        {project.images.map((src, i) => (
          <Polaroid key={i} src={src} alt={project.title} index={i} />
        ))}
      </div>

      <div className="flex flex-col justify-center gap-3 border-l-2 border-dashed border-[#9b6b53]/40 pl-6 md:pl-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-[#351303]">{project.title}</h2>
          {project.tag && (
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#c05754] text-[#c05754] font-bold">
              {project.tag}
            </span>
          )}
        </div>

        <p className="text-sm text-[#573c27] leading-relaxed">{project.pitch}</p>

        <ul className="text-xs text-[#573c27] list-disc pl-4 space-y-0.5">
          {project.metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        <div className="flex gap-2 flex-wrap mt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 bg-[#573c27] text-[#e2c7aa] border border-black"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-2">
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