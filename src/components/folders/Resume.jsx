import RetroWindow from "./RetroWindow";

const Resume = ({ onClose }) => {
  return (
    <RetroWindow
      title="resume.txt"
      onClose={onClose}
      defaultPos={{ x: 160, y: 150 }}
    >
      <div className="p-2 flex flex-col">
        <h1 className="text-sm font-bold text-[#351303]">My Resume - The boring but important file!</h1>
        <a
          href="/CV.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[#351303] underline hover:text-[#c05754]"
        >
          <img src ="/resume.png" alt="Resume" className="w-15 h-auto hover:scale-110 transition-transform ml-7" />
        </a>
        <button onClick={() => window.open('/CV.pdf', '_blank')} className="bg-[#351303] w-30 text-xs text-[#e2c7aa] mt-2 border-2 border-white hover:bg-[#9b6b53] transition-colors px-2 py-1">
          Preview Resume
        </button>
      </div>
    </RetroWindow>
  );
};

export default Resume;
