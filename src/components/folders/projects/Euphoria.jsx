import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = [
  "/projects/euphoria1.png",
  "/projects/euphoria2.png",
  "/projects/euphoria3.png",
  "/projects/euphoria4.png",
  "/projects/euphoria5.png",
];

const Euphoria = ({ onClose }) => {
  return (
    <RetroWindow title="euphoria.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4">
        <Carousel
          images={images}
          maxHeight="400px"
          github="https://github.com/Sami210105/euphoria-fest-management"
          live="https://your-live-link.com"
        />
      </div>
    </RetroWindow>
  );
};

export default Euphoria;
