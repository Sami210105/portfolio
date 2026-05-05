import { useState } from "react";
import Square from "./components/shared/Square";
import Taskbar from "./components/taskbar/Taskbar";
import HomePage from "./components/pages/HomePage";
import ProjectsPage from "./components/pages/ProjectsPage";
import AchievementsPage from "./components/pages/AchievementsPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":         return <HomePage />;
      case "projects":     return <ProjectsPage />;
      case "achievements": return <AchievementsPage />;
      default:             return <HomePage />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e7d7c1]">

      {/* Animated Background */}
      <Square squareSize={32} speed={0.15} direction="diagonal" />

      <div className="relative z-10 w-full h-full pb-16 overflow-auto">
        {renderPage()}
      </div>

      {/* Taskbar */}
      <Taskbar activePage={activePage} setActivePage={setActivePage} />

    </div>
  );
}