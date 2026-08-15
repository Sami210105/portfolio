export const PROJECTS = [
  {
    id: "scholarpress",
    title: "Scholar Press",
    tag: "Featured",
    pitch:
      "A RAG-powered research assistant that reads, compares and grounds answers across multiple academic papers.",
    metrics: [
      "Multi-query RAG pipeline",
      "Hierarchical comparison across 50+ research papers",
      "OKF grounding layer with 7 curated domain files",
    ],
    tech: ["React", "FastAPI", "FAISS", "SentenceTransformers"],
    github: "https://github.com/Sami210105/research-paper-analyzer",
    live: "#",
    images: ["/projects/scholar-press1.png", "/projects/scholar-press2.png"],
  },
  {
    id: "moodify",
    title: "MoodifyAI",
    pitch:
      "Reads the emotional tone of text and turns it into music-mood suggestions.",
    metrics: [
      "GoEmotions + MiniLM + Logistic Regression for 6-class emotion detection.",
      "Achieved 82% accuracy with targeted data augmentation.",
      "Last.fm API for mood-to-genre recommendations.",
    ],
    tech: [
      "FastAPI",
      "React",
      "HuggingFace",
      "Scikit-learn",
    ],
    github: "https://github.com/Sami210105/moodify-ai",
    live: "https://moodifyai-feel-it-find-it.vercel.app/",
    images: ["/projects/moodify1.png", "/projects/moodify2.png"],
  },
  {
    id: "bugganizer",
    title: "Bugganizer",
    pitch:
      "A lightweight desktop todo tracker, where users can track and assign tasks.",
    metrics: [
      "Lightweight desktop-native performance",
      "Multi-user assignment with 3 task states",
      "CRUD task management: Create, edit, complete, and delete tasks",
    ],
    tech: ["Tailwind css", "React", "Tauri"],
    github: "https://github.com/Sami210105/bugganizer",
    live: "#",
    images: ["/projects/bugganizer1.png", "/projects/bugganizer2.png"],
  },
  {
    id: "emosaic",
    title: "Emosaic",
    pitch:
      "Turns any photo into an emoji mosaic using a custom patch-based CNN trained on ADE20K and HuggingFace image sets.",
    metrics: [
      "Custom PatchCNN architecture",
      "Trained on ADE20K dataset",
      "33K+ balanced training patches",
      "~5-6 emosaic generation time",
    ],
    tech: ["Python", "PyTorch", "OpenCV", "CNN"],
    github: "https://github.com/Silvereagle09/emoji-mosaic",
    live: "#",
    images: ["/projects/emojify1.png", "/projects/emojify2.png"],
  },
  {
    id: "euphoria",
    title: "Euphoria",
    pitch:
      "Full event website for the college fest, built end to end landing page, schedule and registration flow.",
    metrics: ["MERN stack", "Interactive UI","Responsive design", "Dynamic registration form"],
    tech: ["MongoDB", "Express", "React", "Node"],
    github: "https://github.com/Sami210105/euphoria-fest-management",
    live: "#",
    images: ["/projects/euphoria1.png", "/projects/euphoria2.png"],
  },
  {
    id: "games-hub",
    title: "Games Hub",
    pitch:
      "AI arcade platform where users can customize classic games using natural-language prompts and export their personalized versions.",
    metrics: [
      "Prompts are converted to customized game themes, backgrounds and assets.",
      "Real-time theme generation",
      "Exportable custom games",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Segmind, ClipDrop API"],
    github: "https://github.com/Sami210105/Games_Hub",
    live: "https://games-hub-380n.onrender.com/",
    images: ["/projects/games-hub1.png", "/projects/games-hub2.png"],
  },
];
