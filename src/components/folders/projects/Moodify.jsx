import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = ["/projects/moodify1.png", "/projects/moodify2.png", "/projects/moodify3.png", "/projects/moodify4.png", "/projects/moodify5.png"];

const Moodify = ({ onClose }) => {
  return (
    <RetroWindow title="moodify.exe" onClose={onClose}>
      <div className="p-4 flex flex-col gap-4">
        <Carousel
          images={images}
          maxHeight="400px"
          github="https://github.com/Sami210105/moodify-ai"
          live="https://moodify-ai.streamlit.app/"
        />
      </div>
    </RetroWindow>
  );
};

export default Moodify;
