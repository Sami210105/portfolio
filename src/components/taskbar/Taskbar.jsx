import StartButton    from "./StartButton";
import HomeTab        from "./HomeTab";
import ProjectsTab    from "./ProjectsTab";
import AchievementsTab from "./AchievementsTab";

export default function Taskbar({ activePage, setActivePage }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-[#351303] backdrop-blur-md flex items-center px-4 gap-1 z-50">
      <StartButton />
      <div className="w-px h-8 bg-[#e2c7aa] mx-2" /> {/* divider */}
      <HomeTab         activePage={activePage} setActivePage={setActivePage} />
      <ProjectsTab     activePage={activePage} setActivePage={setActivePage} />
      <AchievementsTab activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}