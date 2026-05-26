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
            <img src="" alt="html" />
            <img src="" alt="css" />
            <img src="" alt="js" />
            <img src="" alt="react" />
            <img src="" alt="tailwind" />
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Backend & Database</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="" alt="mongodb" />
            <img src="" alt="sql" />
            <img src="" alt="nodejs" />
            <img src="" alt="aws" />
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-md font-bold mb-3 text-[#351303]">Tools & Platforms</h3>
          <div className="flex gap-4 flex-wrap">
            <img src="" alt="vercel" />
            <img src="" alt="render" />
            <img src="/tools/cpp.png" alt="cpp" />
            <img src="/tools/python.png" alt="python" />
            <img src="" alt="github" />
            <img src="" alt="vscode" />
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};

export default Tools;
