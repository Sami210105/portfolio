// EDIT ME: swap in real copy, metrics, tech, links and screenshot paths.
// Image paths follow your existing convention e.g. "/projects/bugganizer1.png"
export const PROJECTS = [
  {
    id: "scholarpress",
    title: "Scholar Press",
    tag: "Featured",
    pitch:
      "A RAG-powered research assistant that reads, compares and grounds answers across multiple academic papers, instead of skimming one at a time.",
    metrics: [
      "Multi-query RAG pipeline",
      "Session-isolated FAISS vector store",
      "Custom OKF grounding layer",
    ],
    tech: ["React", "FastAPI", "FAISS", "Python"],
    github: "https://github.com/Sami210105",
    live: "#",
    images: ["/projects/scholarpress1.png", "/projects/scholarpress2.png"],
  },
  {
    id: "moodify",
    title: "MoodifyAI",
    pitch:
      "Reads the emotional tone of text and turns it into music-mood suggestions — a 6-class GoEmotions classifier behind a fully animated frontend.",
    metrics: [
      "MiniLM embeddings + Logistic Regression",
      "6-class mood detection",
      "Deployed on HuggingFace Spaces + Vercel",
    ],
    tech: ["Python", "FastAPI", "React", "HuggingFace"],
    github: "https://github.com/Sami210105/moodify-ai",
    live: "#",
    images: ["/projects/moodify1.png", "/projects/moodify2.png"],
  },
  {
    id: "bugganizer",
    title: "Bugganizer",
    pitch:
      "A lightweight desktop todo / bug tracker, built to get hands dirty with a native app shell around a React frontend.",
    metrics: ["Native desktop shell", "Local-first task storage"],
    tech: ["JavaScript", "React", "Tauri"],
    github: "https://github.com/Sami210105/bugganizer",
    live: "#",
    images: ["/projects/bugganizer1.png", "/projects/bugganizer2.png"],
  },
  {
    id: "emojify",
    title: "Emojify",
    pitch:
      "Turns any photo into an emoji mosaic using a custom patch-based CNN trained on ADE20K and HuggingFace image sets.",
    metrics: ["Custom PatchCNN architecture", "Trained on ADE20K dataset"],
    tech: ["Python", "PyTorch", "OpenCV"],
    github: "https://github.com/Sami210105",
    live: "#",
    images: ["/projects/emojify1.png", "/projects/emojify2.png"],
  },
  {
    id: "euphoria",
    title: "Euphoria",
    pitch:
      "Full event website for the college fest, built end to end — landing page, schedule and registration flow.",
    metrics: ["MERN stack, built solo"],
    tech: ["MongoDB", "Express", "React", "Node"],
    github: "https://github.com/Sami210105",
    live: "#",
    images: ["/projects/euphoria1.png", "/projects/euphoria2.png"],
  },
  {
    id: "ecell",
    title: "AISSMS E-Cell",
    pitch:
      "Revamped the college Entrepreneurship Cell website, improving layout and content structure for events and team pages.",
    metrics: ["Forked & customised existing site"],
    tech: ["JavaScript", "React"],
    github: "https://github.com/Sami210105",
    live: "#",
    images: ["/projects/ecell1.png", "/projects/ecell2.png"],
  },
];