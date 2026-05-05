import { useState, useEffect } from "react";
import ErrorPopup from "../folders/ErrorPopup";

const achievements = [
  { title: "KGen Hackathon", desc: "Ranked Top 10 at national-level hackathon" },
  { title: "Co-Head Documentation", desc: "Led documentation team & streamlined workflows" },
  { title: "Hackathon Co-Lead", desc: "Managed Innovate Sphere event & coordinated teams" },
  { title: "MERN Intern", desc: "Built real-world full-stack features using React & Node" },
  { title: "NSS Volunteer", desc: "Fort Rajgad conservation, cleanliness drives & blood donation campaigns" },
  { title: "Tech Exposure", desc: "GDSC WOW sessions & RYLA tech talks" },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const getRandomPos = () => ({
  x: Math.floor(Math.random() * (window.innerWidth - 520)) + 20,
  y: Math.floor(Math.random() * (window.innerHeight - 250)) + 20,
});

export default function AchievementsPage() {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const shuffled = shuffle(achievements);

    const timers = shuffled.map((achievement, i) =>
      setTimeout(() => {
        setPopups((prev) => [
          ...prev,
          { id: i, achievement, pos: getRandomPos() },
        ]);
      }, i * 300)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {popups.map(({ id, achievement, pos }, index) => (
        <ErrorPopup
          key={id}
          achievement={achievement}
          defaultPos={pos}
          isLast={index === popups.length - 1}
          onClose={() => setPopups((prev) => prev.filter((p) => p.id !== id))}
          onNext={() => setPopups((prev) => prev.filter((p) => p.id !== id))}
        />
      ))}
    </>
  );
}