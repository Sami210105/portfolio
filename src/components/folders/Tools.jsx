import RetroWindow from "./RetroWindow";

const Tools = ({ onClose }) => {
  return (
    <RetroWindow
      title="tools.txt"
      onClose={onClose}
      defaultPos={{ x: 180, y: 150 }}
    >
      <h1 className="text-sm font-bold text-[var(--window-body-text)] ml-2 mt-1">
        Weapons of choice! The stack behind my work.
      </h1>
      <div className="space-y-6 mt-4 px-3">
        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-body-text)]">Frontend</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/html.png" alt="html" className="w-12 h-auto object-contain"/>
            <img src="tools/css.png" alt="css" className="w-10 h-auto object-contain"/>
            <img src="tools/js.png" alt="js" className="w-12 h-auto object-contain"/>
            <img src="tools/react.png" alt="react" className="w-12 h-auto object-contain"/>
            <img src="tools/tailwind.png" alt="tailwind" className="w-12 h-auto object-contain"/>
          </div>
        </div>

        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-body-text)]">Backend & Database</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/mongodb.png" alt="mongodb" className="w-12 h-auto object-contain"/>
            <img src="tools/sql.png" alt="sql" className="w-12 h-auto object-contain"/>
            <img src="tools/nodejs.png" alt="nodejs" className="w-12 h-auto object-contain"/>
            <img src="tools/aws.png" alt="aws" className="w-12 h-auto object-contain"/>
          </div>
        </div>

        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-body-text)]">Tools & Platforms</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/vercel.png" alt="vercel" className="w-12 h-auto object-contain"/>
            <img src="tools/render.png" alt="render" className="w-12 h-auto object-contain"/>
            <img src="tools/cpp.png" alt="cpp" className="w-12 h-auto object-contain"/>
            <img src="tools/python.png" alt="python" className="w-12 h-auto object-contain"/>
            <img src="tools/github.png" alt="github" className="w-12 h-auto object-contain"/>
            <img src="tools/vscode.png" alt="vscode" className="w-12 h-auto object-contain"/>
          </div>
        </div>

        <div>
          <h3 className="text-md font-bold mb-3 text-[var(--window-body-text)]">
            ML toolkit
          </h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/transformer.png" alt="Transformers" className="w-14 h-auto object-contain"/>
            <img src="tools/pytorch.png" alt="PyTorch" className="w-12 h-auto object-contain"/>
            <img src="tools/numpy.png" alt="NumPy" className="w-14 h-auto object-contain"/>
            <img src="tools/pandas.png" alt="Pandas" className="w-12 h-auto object-contain"/>
            <img src="tools/sklearn.png" alt="Scikit-learn" className="w-14 h-auto object-contain"/>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};

export default Tools;