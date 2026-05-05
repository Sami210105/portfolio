import RetroWindow from "../RetroWindow";
import Carousel from "./Carousel";

const images = ["/projects/moodify.png"];

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
