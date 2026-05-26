import RetroWindow from "./RetroWindow";

const Tools = ({ onClose }) => {
  return (
    <RetroWindow
      title="tools.txt"
      onClose={onClose}
      defaultPos={{ x: 180, y: 150 }}
    >
      <h1 className="text-sm font-bold text-[#351303] ml-2 mt-1">Weapons of choice! The stack behind my work.</h1>
      <div className="flex gap-3 mt-1 mb-2 gap-4 ml-2 px-4 py-2">
        <img src="" alt="html"/>
        <img src="" alt="css"/>
        <img src="" alt="js"/>
        <img src="" alt="react"/>
        <img src="" alt="tailwind"/>
        <img src="" alt="mongodb"/>
        <img src="" alt="sql"/>
        <img src="" alt="aws"/>
        <img src="" alt="vercel"/>
        <img src="" alt="render"/>
        <img src="" alt="nodejs"/>
        <img src="/tools/cpp.png" alt="cpp"/>
        <img src="/tools/python.png" alt="python"/>
        <img src="" alt="github"/>
        <img src="" alt="vscode"/>
      </div>
    </RetroWindow>
  );
};

export default Tools;
