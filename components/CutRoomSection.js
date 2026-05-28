"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const videoItems = [
  {
    id: 1,
    title: "Hype Reel",
    description: "A high-energy hype video showcasing creative editing, colour grading, and motion design.",
    src: "/videos/HypeVideo-Vince.mp4",
    emoji: "🎬",
    tags: ["Colour Grading", "Motion", "Cinematic"],
  },
  {
    id: 2,
    title: "Should You Fish in a Marina?",
    description: "A short-form documentary-style edit exploring the debate around marina fishing — storytelling through visuals.",
    src: "/videos/fishing.mp4",
    emoji: "🎣",
    tags: ["Documentary", "Short-form", "Storytelling"],
  },
];

function VideoCard({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      className="cutroom-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video area */}
      <div
        className="cutroom-video-wrapper"
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && togglePlay()}
      >
        <video
          ref={videoRef}
          src={item.src}
          className="cutroom-video"
          loop
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />

        {/* Play / Pause overlay */}
        <div className={`cutroom-overlay ${playing && !hovered ? "cutroom-overlay-hidden" : ""}`}>
          <div className="cutroom-play-btn">
            {playing ? (
              <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </div>
        </div>

        {/* Scan-line cinema effect */}
        <div className="cutroom-scanlines" aria-hidden="true" />
      </div>

      {/* Card body */}
      <div className="cutroom-body">
        <div className="cutroom-title-row">
          <span className="cutroom-emoji">{item.emoji}</span>
          <h3 className="cutroom-title">{item.title}</h3>
        </div>
        <p className="cutroom-desc">{item.description}</p>
        <div className="cutroom-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="cutroom-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CutRoomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.15 });

  return (
    <motion.section
      ref={ref}
      className="cutroom-section"
      id="cutroom"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section header */}
      <motion.div
        className="cutroom-header"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="cutroom-badge">🎞️ Video Edits</span>
        <h2 className="cutroom-heading">The Cut Room</h2>
        <p className="cutroom-subheading">
          Where raw footage becomes something worth watching.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="cutroom-grid">
        {videoItems.map((item, i) => (
          <VideoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
