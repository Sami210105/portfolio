import RetroWindow from "./RetroWindow";

// Reusable tool item: same-size icon + name
const Tool = ({ src, alt }) => (
  <div className="flex flex-col items-center gap-1 w-16">
    <div className="w-12 h-12 flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-12 h-12 object-contain"
      />
    </div>

    <span className="text-[10px] font-mono text-[var(--window-header-text)] text-center">
      {alt}
    </span>
  </div>
);

const Tools = ({ onClose }) => {
  return (
    <RetroWindow
      title="tools.txt"
      onClose={onClose}
      defaultPos={{ x: 100, y: 100 }}
    >
      {/* Intro */}
      <h1 className="text-sm font-bold text-[var(--window-header-text)] ml-2 mt-1">
        Weapons of choice! The stack behind my work.
      </h1>

      <div className="space-y-6 mt-4 px-3">

        {/* Frontend */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-header-text)]">
            Frontend
          </h3>

          <div className="flex gap-4 flex-wrap">
            <Tool src="tools/html.png" alt="HTML" />
            <Tool src="tools/css.png" alt="CSS" />
            <Tool src="tools/js.png" alt="JavaScript" />
            <Tool src="tools/react.png" alt="React" />
            <Tool src="tools/tailwind.png" alt="Tailwind" />
          </div>
        </div>

        {/* Backend & Database */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-header-text)]">
            Backend & Database
          </h3>

          <div className="flex gap-4 flex-wrap">
            <Tool src="tools/mongodb.png" alt="MongoDB" />
            <Tool src="tools/sql.png" alt="SQL" />
            <Tool src="tools/nodejs.png" alt="Node.js" />
            <Tool src="tools/aws.png" alt="AWS" />
          </div>
        </div>

        {/* Tools & Platforms */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-header-text)]">
            Tools & Platforms
          </h3>

          <div className="flex gap-4 flex-wrap">
            <Tool src="tools/vercel.png" alt="Vercel" />
            <Tool src="tools/render.png" alt="Render" />
            <Tool src="tools/cpp.png" alt="C++" />
            <Tool src="tools/python.png" alt="Python" />
            <Tool src="tools/github.png" alt="GitHub" />
            <Tool src="tools/vscode.png" alt="VS Code" />
          </div>
        </div>

        {/* ML Toolkit */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-header-text)]">
            ML Toolkit
          </h3>

          <div className="flex gap-4 flex-wrap pb-2">
            <Tool src="tools/transformer.png" alt="Transformers" />
            <Tool src="tools/pytorch.png" alt="PyTorch" />
            <Tool src="tools/numpy.png" alt="NumPy" />
            <Tool src="tools/pandas.png" alt="Pandas" />
            <Tool src="tools/sklearn.png" alt="Scikit" />
          </div>
        </div>

      </div>
    </RetroWindow>
  );
};

export default Tools;