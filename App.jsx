import { useMemo, useRef, useState } from "react";
import HERPHOTO from "./assets/her-photo.png";

const MESSAGES = [
  "You stole my heart 💘",
  "Falling harder for you every second 💖",
  "Your smile is magical ✨",
  "Forever together 🌹",
  "You're my favorite person ❤️",
];

const FALL_TEXT = [
  "I'm falling for you 😵‍💫💕",
  "Too cute to handle 😭❤️",
  "Heart officially stolen 💘",
];

function FloatingItem({ emoji, left, duration, delay, size }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: "110%",
        fontSize: `${size}rem`,
        animation: `floatUp ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: "none",
        opacity: 0.8,
      }}
    >
      {emoji}
    </div>
  );
}

export default function App() {
  const [love, setLove] = useState(0);
  const [msg, setMsg] = useState("");
  const [falling, setFalling] = useState(false);
  const [kisses, setKisses] = useState([]);
  const audioRef = useRef(null);

  const bgHearts = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 1.5,
      emoji: ["❤️", "💖", "💕", "🌸", "✨"][Math.floor(Math.random() * 5)],
    }));
  }, []);

  const triggerLove = (e) => {
    setLove((v) => Math.min(v + 10, 100));
    setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    setFalling(true);

    setKisses((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      },
    ]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setTimeout(() => setFalling(false), 1500);
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div
      onClick={triggerLove}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background:
          "radial-gradient(circle at top, #ff8fab 0%, #ff4d8d 35%, #8b004f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
        cursor: "pointer",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

        @keyframes floatUp {
          from { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          to { transform: translateY(-130vh) rotate(360deg); opacity: 0; }
        }

        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes popup {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: translateY(-80px); }
        }

        @keyframes fallDown {
          0% { transform: rotate(0deg) translateY(0px); }
          30% { transform: rotate(-10deg) translateY(20px); }
          70% { transform: rotate(10deg) translateY(45px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
      `}</style>

      {bgHearts.map((item) => (
        <FloatingItem key={item.id} {...item} />
      ))}

      <h1
        style={{
          color: "white",
          fontSize: "3.5rem",
          textShadow: "0 0 20px rgba(255,255,255,0.8)",
          animation: "pulse 2s infinite",
        }}
      >
        💖 Romantic Love Game 💖
      </h1>

      <div
        style={{
          width: "320px",
          height: "18px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.2)",
          overflow: "hidden",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            width: `${love}%`,
            height: "100%",
            background: "linear-gradient(90deg,#ffe066,#ff4d6d,#ff0054)",
            transition: "0.4s",
          }}
        />
      </div>

      <div
        style={{
          animation: falling ? "fallDown 1.5s ease" : "none",
          position: "relative",
        }}
      >
        <img
          src={HERPHOTO}
          alt="Her"
          style={{
            width: "340px",
            borderRadius: "35px",
            border: "5px solid white",
            boxShadow: "0 0 40px rgba(255,255,255,0.6)",
          }}
        />

        {falling && (
          <div
            style={{
              position: "absolute",
              bottom: -65,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              background: "rgba(0,0,0,0.35)",
              padding: "10px 18px",
              borderRadius: "18px",
              animation: "popup 1.5s forwards",
            }}
          >
            {FALL_TEXT[Math.floor(Math.random() * FALL_TEXT.length)]}
          </div>
        )}
      </div>

      <div
        style={{
          color: "white",
          marginTop: "25px",
          fontWeight: "bold",
          fontSize: "1.2rem",
          minHeight: "30px",
        }}
      >
        {msg}
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "12px 22px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Love Meter: {love}% 💘
      </div>

      {kisses.map((k) => (
        <div
          key={k.id}
          style={{
            position: "fixed",
            left: k.x,
            top: k.y,
            fontSize: "2.2rem",
            animation: "popup 1s forwards",
            pointerEvents: "none",
          }}
        >
          💋
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 20,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        Tap anywhere to shower love 💕
      </div>

      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"
      />
    </div>
  );
}
