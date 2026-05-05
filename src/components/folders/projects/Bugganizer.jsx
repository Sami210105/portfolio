import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = ["/projects/bugganizer1.png", "/projects/bugganizer2.png"];

const Bugganizer = ({ onClose }) => {
  return (
    <RetroWindow title="bugganizer.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4">
        <Carousel
          images={images}
          maxHeight="400px"
          github="https://github.com/Sami210105/bugganizer"
          live="https://your-live-link.com"
        />
      </div>
    </RetroWindow>
  );
};

export default Bugganizer;
