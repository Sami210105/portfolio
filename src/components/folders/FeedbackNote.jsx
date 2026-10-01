import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_jbqcmpa";
const EMAILJS_TEMPLATE_ID = "template_hmygv5s";
const EMAILJS_PUBLIC_KEY = "Je67Jf4UYZl5lM-Z5";

const MOODS = [
  { value: 1, label: "Very unhappy", color: "bg-rose-400" },
  { value: 2, label: "Unhappy", color: "bg-orange-300" },
  { value: 3, label: "Neutral", color: "bg-amber-200" },
  { value: 4, label: "Happy", color: "bg-lime-300" },
  { value: 5, label: "Very happy", color: "bg-emerald-400" },
];

// Eyes + mouth path for each of the 5 moods, worst to best.
const MOOD_FACES = [
  {
    eyes: (
      <>
        <circle cx="9" cy="8" r="1.3" />
        <circle cx="15" cy="8" r="1.3" />
      </>
    ),
    mouth: <path d="M8 16.5c1-2 2.5-3 4-3s3 1 4 3" />,
  },
  {
    eyes: (
      <>
        <circle cx="9" cy="8" r="1.3" />
        <circle cx="15" cy="8" r="1.3" />
      </>
    ),
    mouth: <path d="M8.5 15.5c1-1 2.2-1.5 3.5-1.5s2.5.5 3.5 1.5" />,
  },
  {
    eyes: (
      <>
        <circle cx="9" cy="8" r="1.3" />
        <circle cx="15" cy="8" r="1.3" />
      </>
    ),
    mouth: <path d="M8.5 14.5h7" />,
  },
  {
    eyes: (
      <>
        <circle cx="9" cy="8" r="1.3" />
        <circle cx="15" cy="8" r="1.3" />
      </>
    ),
    mouth: <path d="M8 14c1 1.5 2.5 2.3 4 2.3s3-.8 4-2.3" />,
  },
  {
    eyes: (
      <>
        <path d="M7.5 9.5c.7-.9 1.7-1.3 2.5-.9" transform="translate(0, -2)" />
        <path d="M13.5 8.6c.8-.4 1.8 0 2.5.9" transform="translate(0, -2)" />
      </>
    ),
    mouth: <path d="M7.5 13.5c1.3 2.2 3 3.3 4.5 3.3s3.2-1.1 4.5-3.3" />,
  },
];

function SmileyButton({ mood, selected, onSelect }) {
  const face = MOOD_FACES[mood.value - 1];
  return (
    <button
      type="button"
      onClick={() => onSelect(mood.value)}
      aria-label={mood.label}
      aria-pressed={selected}
      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border-2 border-[var(--window-border-dark)] transition-transform ${mood.color} ${
        selected
          ? "scale-110 shadow-[2px_2px_0px_rgba(0,0,0,0.35)]"
          : "opacity-70"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="#3f2f1f"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {face.eyes}
        {face.mouth}
      </svg>
    </button>
  );
}

export default function FeedbackNote() {
  const [rating, setRating] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async () => {
    if (!rating || status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // variable names must match the {{placeholders}} in the EmailJS template
          title: "Portfolio Feedback",
          name: name.trim() || "Anonymous",
          time: new Date().toLocaleString(),
          ratings: MOODS[rating - 1].label,
          message: message.trim() || "(no message)",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
    } catch (err) {
      console.error("Feedback send failed:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setRating(null);
    setName("");
    setMessage("");
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-2xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.25)] text-center">
        <p className="text-base font-bold text-[var(--window-body-text)]">
          Thanks for the feedback! 💌
        </p>
        <button
          onClick={reset}
          className="mt-2 text-xs font-mono text-[var(--window-text-secondary)] underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--window-body-bg)] p-2">
      <h2 className="text-lg font-extrabold text-[var(--window-body-text)]">
        Feedback
      </h2>
      <p className="text-sm text-[var(--window-text-secondary)] mt-1">
        So, did I do a good job?
      </p>

      <div className="flex items-center justify-between gap-2 mt-3">
        {MOODS.map((m) => (
          <SmileyButton
            key={m.value}
            mood={m}
            selected={rating === m.value}
            onSelect={setRating}
          />
        ))}
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        maxLength={40}
        className="mt-6 w-full bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-lg px-2.5 h-10 text-sm text-[var(--window-body-text)] placeholder-[var(--window-text-secondary)] placeholder:opacity-70 outline-none shadow-[inset_2px_2px_0px_rgba(0,0,0,0.12)]"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Be honest... type your verdict here!"
        rows={3}
        maxLength={500}
        className="mt-3 w-full h-[150px] resize-none bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-lg p-2.5 text-sm text-[var(--window-body-text)] placeholder-[var(--window-text-secondary)] placeholder:opacity-70 outline-none shadow-[inset_2px_2px_0px_rgba(0,0,0,0.12)]"
      />

      <div className="flex items-center justify-between gap-3 mt-2">
        <span className="text-[11px] text-[var(--window-text-secondary)]">
          {status === "error" ? "Something went wrong — try again?" : "\u00A0"}
        </span>
        <button
          onClick={submit}
          disabled={!rating || status === "sending"}
          aria-label="Send feedback"
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[var(--window-button-bg)] text-[var(--window-button-text)] border-2 border-[var(--window-border-dark)] disabled:opacity-40"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 11 18-7-7 18-2.5-7.5L3 11Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
