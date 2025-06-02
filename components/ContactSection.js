"use client";

import { useState, useRef } from "react";
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError("");

  const formData = new FormData(e.target);
  
  try {
    const response = await fetch("https://formcarry.com/s/LhmDo0SwOHr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      setError("Failed to send message. Please try again.");
    }
  } catch (err) {
    setError("Failed to send message. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

return (
    <motion.section 
      ref={ref}
      className="contact-section" 
      id="contact"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 variants={itemVariants}>Contact</motion.h2>
      <motion.p 
        className="contact-description"
        variants={itemVariants}
        style={{ color: "#cccccc", fontSize: "1.1rem" }}
      >
        Interested in working together or just want to say hi? Fill out the form
        below or email me directly.
      </motion.p>
      {submitted ? (
        <motion.div 
          variants={itemVariants}
          className="success-message"
          style={{ 
            color: "#4ade80", 
            textAlign: "center", 
            fontSize: "1.2rem",
            background: "rgba(74, 222, 128, 0.1)",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid rgba(74, 222, 128, 0.3)"
          }}
        >
          ✅ Thank you! Your message has been sent successfully.
        </motion.div>
      ) : (
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <div className="contact-form-group">
            <label className="contact-form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="contact-form-input"
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="contact-form-input"
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label">
              Message
            </label>
            <textarea
              name="message"
              required
              className="contact-form-textarea"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-form-button"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>          {error && (
            <motion.p 
              variants={itemVariants}
              style={{ 
                color: "#ef4444", 
                marginTop: 8,
                background: "rgba(239, 68, 68, 0.1)",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid rgba(239, 68, 68, 0.3)"
              }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>
      )}
    </motion.section>
  );
}
