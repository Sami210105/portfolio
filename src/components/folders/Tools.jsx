import RetroWindow from "./RetroWindow";

const Tools = ({ onClose }) => {
  return (
    <RetroWindow
      title="tools.txt"
      onClose={onClose}
      defaultPos={{ x: 180, y: 150 }}
    >
      <h1 className="text-sm font-bold text-[#351303] ml-2 mt-1">
        Weapons of choice! The stack behind my work.
      </h1>
      <div className="space-y-6 mt-4 px-3">
        {/* Frontend */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Frontend</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/html.png" alt="html" className="w-14 h-auto object-contain"/>
            <img src="tools/css.png" alt="css" className="w-14 h-auto object-contain"/>
            <img src="tools/js.png" alt="js" className="w-14 h-auto object-contain"/>
            <img src="tools/react.png" alt="react" className="w-14 h-auto object-contain"/>
            <img src="tools/tailwind.png" alt="tailwind" className="w-14 h-auto object-contain"/>
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Backend & Database</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/mongodb.png" alt="mongodb" className="w-14 h-auto object-contain"/>
            <img src="tools/sql.png" alt="sql" className="w-14 h-auto object-contain"/>
            <img src="tools/nodejs.png" alt="nodejs" className="w-14 h-auto object-contain"/>
            <img src="tools/aws.png" alt="aws" className="w-14 h-auto object-contain"/>
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Tools & Platforms</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="tools/vercel.png" alt="vercel" className="w-14 h-auto object-contain"/>
            <img src="tools/render.png" alt="render" className="w-14 h-auto object-contain"/>
            <img src="tools/cpp.png" alt="cpp" className="w-14 h-auto object-contain"/>
            <img src="tools/python.png" alt="python" className="w-14 h-auto object-contain"/>
            <img src="tools/github.png" alt="github" className="w-14 h-auto object-contain"/>
            <img src="tools/vscode.png" alt="vscode" className="w-14 h-auto object-contain"/>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <img src="tools/numpy.png" alt="NumPy" className="w-14 h-auto object-contain"/>
          <img src="tools/pandas.png" alt="Pandas" className="w-14 h-auto object-contain"/>
          <img src="tools/scikitlearn.png" alt="Scikit-learn" className="w-14 h-auto object-contain"/>
          <img src="tools/transformers.png" alt="Transformers" className="w-14 h-auto object-contain"/>
          <img src="tools/huggingface.png" alt="Hugging Face" className="w-14 h-auto object-contain"/>
        </div>
      </div>
    </RetroWindow>
  );
};

export default Tools;
