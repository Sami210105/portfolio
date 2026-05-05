import RetroWindow from "./RetroWindow";

const AboutMe = ({ onClose }) => {
  return (
    <RetroWindow
      title="about_me.txt"
      onClose={onClose}
      defaultPos={{ x: 180, y: 150 }}
    >
      <div className="p-5 flex gap-10 mt-4 mb-4 mr-4">
        <div className="flex items-center justify-center">
          <img
            src="/me.jpeg"
            className="border-2 border-black w-[400px] h-auto"
          />
        </div>

        <div className="flex flex-col gap-6 items-start justify-center">
          <h1 className="text-2xl text-[#351303] m-0 text-left">Hi! I am Samidha,</h1>
          <p className="text-lg text-[#351303] uppercase tracking-widest m-0 text-left font-bold">
            Full-Stack Developer
          </p>
          <p className="text-sm text-[#573c27] leading-relaxed m-0 text-left">
            3rd year CS Engineering student. I live in React, dabble in ML, and
            think pixel art is a valid life choice.
          </p>
        </div>
      </div>
    </RetroWindow>
  );
};

export default AboutMe;
