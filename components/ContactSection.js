"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
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
      });      if (response.ok) {
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
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <p className="contact-description">
        Interested in working together or just want to say hi? Fill out the form
        below or email me directly.
      </p>
      {submitted ? (
        <p style={{ color: "green", textAlign: "center" }}>
          Thank you! Your message has been sent.
        </p>
      ) : (        <form
          className="contact-form"
          onSubmit={handleSubmit}
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
          </button>
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>{error}</p>
          )}
        </form>      )}
    </section>
  );
}
