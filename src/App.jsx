import { useState } from "react";
import Square from "./components/shared/Square";
import Taskbar from "./components/taskbar/Taskbar";
import HomePage from "./components/pages/HomePage";
import ProjectsPage from "./components/pages/ProjectsPage";
import AchievementsPage from "./components/pages/AchievementsPage";
import { useDesktopTheme } from "./components/folders/ThemeContext";
import { BACKGROUNDS } from "./components/folders/themes";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const { settings } = useDesktopTheme();
  const bg =
    BACKGROUNDS.find((b) => b.id === settings.backgroundId) ?? BACKGROUNDS[0];

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage setActivePage={setActivePage} />;

      case "projects":
        return <ProjectsPage />;

      case "achievements":
        return <AchievementsPage />;

      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e7d7c1]">
      {/* Background: animated grid or static image */}
      {bg.type === "component" ? (
        <Square squareSize={32} speed={0.15} direction="diagonal" />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg.image})` }}
        />
      )}

      <div className="relative z-10 w-full h-full pb-16 overflow-auto">
        {renderPage()}
      </div>

      {/* Taskbar */}
      <Taskbar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
