"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const videoItems = [
  {
    id: 1,
    title: "Hype Reel",
    description:
      "A high-energy hype video showcasing creative editing, colour grading, and motion design.",
    src: "/videos/HypeVideo-Vince.mp4",
    poster: "/images/poster-hype.jpg",
    orientation: "landscape", // 1920x1080
    emoji: "🎬",
    tags: ["Colour Grading", "Motion", "Cinematic"],
  },
  {
    id: 2,
    title: "Should You Fish in a Marina?",
    description:
      "A short-form documentary-style edit exploring the debate around marina fishing — storytelling through visuals.",
    src: "/videos/fishing.mp4",
    poster: "/images/poster-fishing.jpg",
    orientation: "portrait", // 1080x1920
    emoji: "🎣",
    tags: ["Documentary", "Short-form", "Storytelling"],
  },
  {
    id: 3,
    title: "Event Edit — 0221",
    description:
      "A dynamic event edit capturing the energy and atmosphere of a live event through tight cuts and stylised grading.",
    src: "/videos/video-0221.mp4",
    poster: "/images/poster-0221.jpg",
    orientation: "landscape", // 1280x720
    emoji: "🎉",
    tags: ["Event", "Colour Grading", "Dynamic"],
  },
  {
    id: 4,
    title: "Sample Reel",
    description:
      "A showcase reel highlighting versatile editing style — from pacing and transitions to colour work.",
    src: "/videos/sample-vid.mp4",
    poster: "/images/poster-sample.jpg",
    orientation: "landscape", // 1920x1080
    emoji: "🎞️",
    tags: ["Reel", "Transitions", "Cinematic"],
  },
  {
    id: 5,
    title: "Waylay Clutch",
    description:
      "An esports highlight edit featuring fast-paced cuts, motion graphics, and gaming-focused visual storytelling.",
    src: "/videos/waylay-clutch.mp4",
    poster: "/images/poster-waylay.jpg",
    orientation: "landscape", // 1920x1080
    emoji: "🎮",
    tags: ["Esports", "Gaming", "Highlight"],
  },
];

/* ── Video Lightbox Modal ─────────────────────────────────────────── */
function VideoModal({ item, onClose }) {
  const modalVideoRef = useRef(null);
  const isPortrait = item.orientation === "portrait";

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Autoplay when modal opens
  useEffect(() => {
    const v = modalVideoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="cutroom-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Playing: ${item.title}`}
      >
        <motion.div
          className={`cutroom-modal-content${isPortrait ? " cutroom-modal-portrait" : ""}`}
          initial={{ scale: 0.82, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cutroom-modal-header">
            <div className="cutroom-modal-title-row">
              <span className="cutroom-modal-emoji">{item.emoji}</span>
              <h3 className="cutroom-modal-title">{item.title}</h3>
            </div>
            <button
              className="cutroom-modal-close"
              onClick={onClose}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>

          {/* Video with full native controls */}
          <div className={`cutroom-modal-video-wrap${isPortrait ? " cutroom-modal-video-portrait" : ""}`}>
            <video
              ref={modalVideoRef}
              src={item.src}
              className="cutroom-modal-video"
              controls
              playsInline
              preload="auto"
            />
          </div>

          {/* Tags */}
          <div className="cutroom-modal-footer">
            {item.tags.map((tag) => (
              <span key={tag} className="cutroom-tag">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Thumbnail Card ───────────────────────────────────────────────── */
function VideoCard({ item, index, onOpenModal }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="cutroom-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail / click-to-open area */}
      <div
        className="cutroom-video-wrapper"
        onClick={() => onOpenModal(item)}
        role="button"
        tabIndex={0}
        aria-label={`Watch ${item.title}`}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && onOpenModal(item)
        }
      >
        {/* Static poster image */}
        {item.poster && (
          <img
            src={item.poster}
            alt={`${item.title} preview`}
            className="cutroom-video cutroom-poster"
          />
        )}

        {/* Play overlay */}
        <div className={`cutroom-overlay${hovered ? " cutroom-overlay-hover" : ""}`}>
          <div className="cutroom-play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="38" height="38">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <span className="cutroom-play-hint">Click to watch</span>
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

/* ── Section ──────────────────────────────────────────────────────── */
export default function CutRoomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeVideo, setActiveVideo] = useState(null);

  const handleOpenModal = useCallback((item) => setActiveVideo(item), []);
  const handleCloseModal = useCallback(() => setActiveVideo(null), []);

  return (
    <>
      <motion.section
        ref={ref}
        className="cutroom-section"
        id="cutroom"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section header */}
        <motion.div
          className="cutroom-header"
          initial={{ y: 24, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="cutroom-badge">🎞️ Video Edits</span>
          <h2 className="cutroom-heading">The Cut Room</h2>
          <p className="cutroom-subheading">
            Where raw footage becomes something worth watching.
          </p>
        </motion.div>

        {/* Cards grid — responsive for 5 items */}
        <div className="cutroom-grid">
          {videoItems.map((item, i) => (
            <VideoCard
              key={item.id}
              item={item}
              index={i}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </motion.section>

      {/* Modal rendered at root level */}
      {activeVideo && (
        <VideoModal item={activeVideo} onClose={handleCloseModal} />
      )}
    </>
  );
}
