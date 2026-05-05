import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = [
  "/projects/games-hub1.png",
  "/projects/games-hub2.png",
  "/projects/games-hub3.png",
  "/projects/games-hub4.png",
  "/projects/games-hub5.png",
];

const Gameshub = ({ onClose }) => {
  return (
    <RetroWindow title="games-hub.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4">
        <Carousel
          images={images}
          maxHeight="400px"
          github="https://github.com/Sami210105/Games_Hub"
          live="https://games-hub-380n.onrender.com/"
        />
      </div>
    </RetroWindow>
  );
};

export default Gameshub;
