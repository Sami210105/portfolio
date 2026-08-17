import { useState, useRef, useEffect } from "react";
import RetroWindow from "./RetroWindow";

const PROMPT = "samidha@devbox";

const COMMAND_LIST = [
  { cmd: "help", desc: "list all available commands" },
  { cmd: "whoami", desc: "who am i, really" },
  { cmd: "ls", desc: "list folders on this desktop" },
  { cmd: "about", desc: "open the About Me folder" },
  { cmd: "music", desc: "open the Playlist folder" },
  { cmd: "connect", desc: "open the Connect folder" },
  { cmd: "resume", desc: "open the Resume folder" },
  { cmd: "tools", desc: "open the Tools folder" },
  { cmd: "date", desc: "show current date & time" },
  { cmd: "echo <text>", desc: "print text back" },
  { cmd: "sudo <anything>", desc: "try it and see" },
  { cmd: "neofetch", desc: "system info, but cuter" },
  { cmd: "clear", desc: "clear the terminal" },
  { cmd: "exit", desc: "close this terminal" },
];

const Terminal = ({ onOpenWindow, onClose, defaultPos }) => {
  const [history, setHistory] = useState([
    {
      type: "output",
      lines: ["Welcome to devbox. Type 'help' to see what I can do."],
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const lower = cmd.toLowerCase();
    const inputEntry = { type: "input", text: trimmed };
    let output = [];

    switch (lower) {
      case "help":
        output = COMMAND_LIST.map((c) => `> ${c.cmd.padEnd(16)} - ${c.desc}`);
        break;

      case "whoami":
        output = [
          "> hi ;) sam here",
          "> developer",
          "> coffee lover",
          "> mind keeps hovering between earth and stars",
          "> still figuring out my love for coding",
          "> i forget things. a lot.",
        ];
        break;

      case "ls":
        output = ["projects/ /resume achievements/ music/ toolset/"];
        break;

      case "about":
        output = ["opening about-me/ ..."];
        onOpenWindow?.("about");
        break;

      case "music":
        output = ["opening playlist/ ..."];
        onOpenWindow?.("music");
        break;

      case "connect":
        output = ["opening connect/ ..."];
        onOpenWindow?.("connect");
        break;

      case "resume":
        output = ["opening resume/ ..."];
        onOpenWindow?.("resume");
        break;

      case "tools":
        output = ["opening tools/ ..."];
        onOpenWindow?.("tools");
        break;

      case "date":
        output = [new Date().toString()];
        break;

      case "echo":
        output = [args.join(" ")];
        break;

      case "sudo":
        output = ["nice try. permission denied :)"];
        break;

      case "neofetch":
        output = [
          "devbox@samidha",
          "-------------------",
          "OS: PandaOS 1.0",
          "Shell: sassy-sh",
          "Uptime: forever coding",
          "Theme: parchment-retro",
        ];
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        onClose?.();
        break;

      default:
        output = [`command not found: ${cmd}. type 'help' for a list.`];
    }

    setHistory((h) => [...h, inputEntry, { type: "output", lines: output }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    }
  };

  return (
    <RetroWindow
      title="terminal_exe"
      onClose={onClose}
      defaultPos={defaultPos}
      defaultSize={{ width: 450, height: 300 }}
      minSize={{ width: 320, height: 160 }}
      disableCenter
    >
      <div
        className="w-full h-full bg-black p-3 font-mono text-[13px] overflow-y-auto cursor-text"
        ref={scrollRef}
        onClick={focusInput}
      >
        {history.map((entry, i) =>
          entry.type === "input" ? (
            <div key={i} className="flex gap-1">
              <span className="text-[#e2c7aa]">{PROMPT}:~$</span>
              <span className="text-white">{entry.text}</span>
            </div>
          ) : (
            entry.lines.map((line, j) => (
              <div
                key={`${i}-${j}`}
                className="text-[#7ee787] whitespace-pre-wrap"
              >
                {line}
              </div>
            ))
          ),
        )}

        <div className="flex gap-1">
          <span className="text-[#e2c7aa]">{PROMPT}:~$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-white caret-[#7ee787]"
            spellCheck={false}
          />
        </div>
      </div>
    </RetroWindow>
  );
};

export default Terminal;
