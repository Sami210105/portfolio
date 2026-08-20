import RetroWindow from "./RetroWindow";

const AboutMe = ({ onClose }) => {
  return (
    <RetroWindow
      title="about_me.txt"
      onClose={onClose}
      defaultPos={{ x: 200, y: 200 }}
      disableCenter
    >
      <div className="p-5 flex gap-10 mt-4 mb-4 mr-4">
        <div className="flex items-center justify-center">
          <img
            src="/me.jpeg"
            className="border-2 border-[var(--window-border-dark)] w-[400px] h-auto"
          />
        </div>

        <div className="flex flex-col gap-6 items-start justify-center">
          <h1 className="text-2xl text-[var(--window-body-text)] m-0 text-left">Hi! I am Samidha,</h1>
          <p className="text-lg text-[var(--window-body-text)] uppercase tracking-widest m-0 text-left font-bold">
            Full-Stack Developer
          </p>
          <p className="text-sm text-[var(--window-text-secondary)] leading-relaxed m-0 text-left">
            4th year CS Engineering student. I live in React, dabble in ML, and
            think pixel art is a valid life choice.
          </p>
        </div>
      </div>
    </RetroWindow>
  );
};

export default AboutMe;