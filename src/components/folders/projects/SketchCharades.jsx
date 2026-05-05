import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = [
  "/projects/sketch-charades1.jpeg",
  "/projects/sketch-charades2.jpeg",
  "/projects/sketch-charades3.jpeg",
  "/projects/sketch-charades4.jpeg",
  "/projects/sketch-charades5.jpeg",
];

const SketchCharades = ({ onClose }) => {
  return (
    <RetroWindow title="sketch-charades.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4 items-center">
        <Carousel
          images={images}
          maxHeight="350px"
          github="https://github.com/Sami210105/sketch-charades"
          live="https://your-live-link.com"
        />
      </div>
    </RetroWindow>
  );
};

export default SketchCharades;
