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
            <img src="" alt="html" className="w-10 h-10 object-contain"/>
            <img src="" alt="css" className="w-10 h-10 object-contain"/>
            <img src="" alt="js" className="w-10 h-10 object-contain"/>
            <img src="" alt="react" className="w-10 h-10 object-contain"/>
            <img src="" alt="tailwind" className="w-10 h-10 object-contain"/>
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Backend & Database</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="" alt="mongodb" className="w-10 h-10 object-contain"/>
            <img src="" alt="sql" className="w-10 h-10 object-contain"/>
            <img src="" alt="nodejs" className="w-10 h-10 object-contain"/>
            <img src="" alt="aws" className="w-10 h-10 object-contain"/>
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Tools & Platforms</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="" alt="vercel" className="w-10 h-10 object-contain"/>
            <img src="" alt="render" className="w-10 h-10 object-contain"/>
            <img src="/tools/cpp.png" alt="cpp" className="w-10 h-10 object-contain"/>
            <img src="/tools/python.png" alt="python" className="w-10 h-10 object-contain"/>
            <img src="" alt="github" className="w-10 h-10 object-contain"/>
            <img src="" alt="vscode" className="w-10 h-10 object-contain"/>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};

export default Tools;
