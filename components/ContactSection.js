"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 24 }}>
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
          style={{
            maxWidth: 500,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              style={{
                padding: 12,
                borderRadius: 6,
                border: "1px solid #ccc",
                marginBottom: 8,
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              style={{
                padding: 12,
                borderRadius: 6,
                border: "1px solid #ccc",
                marginBottom: 8,
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              required
              style={{
                padding: 12,
                borderRadius: 6,
                border: "1px solid #ccc",
                minHeight: 100,
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </label>          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: 12,
              borderRadius: 6,
              background: isSubmitting ? "#ccc" : "#4f8cff",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              marginTop: 8,
              width: "100%",
              boxSizing: "border-box",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>{error}</p>
          )}
        </form>
      )}
      <style jsx>{`
        @media (max-width: 600px) {
          .contact-form {
            padding: 1rem !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
