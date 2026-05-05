import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = ["/projects/ecell.png"];

const Nec = ({ onClose }) => {
  return (
    <RetroWindow title="nec.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4">
        <Carousel
          images={images}
          maxHeight="400px"
          github="https://github.com/Sami210105/E-Cell"
          live="https://ecell-aissmscoe.vercel.app/"
        />
      </div>
    </RetroWindow>
  );
};

export default Nec;
