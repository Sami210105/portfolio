import RetroWindow from "./RetroWindow";
import FeedbackNote from "./FeedbackNote";

const Feedback = ({ onClose }) => {
  return (
    <RetroWindow
      title="feedback.txt"
      onClose={onClose}
      defaultPos={{ x: 200, y: 200 }}
      defaultSize={{ width: 420, height: null }}
    >
      <div className="p-4">
        <FeedbackNote />
      </div>
    </RetroWindow>
  );
};

export default Feedback;