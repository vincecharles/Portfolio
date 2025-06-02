"use client";

import { useState, useEffect, useRef } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.formcarry) {
      window.formcarry({
        form: "LhmDo0SwOHr",
        element: "#formcarry-contact",
        onSuccess: function () {
          setSubmitted(true);
        },
        onError: function (err) {
          setError(err.message || "Submission failed.");
        },
      });
    }
  }, []);

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
      ) : (
        <form
          className="contact-form"
          id="formcarry-contact"
          ref={formRef}
          style={{
            maxWidth: 500,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          action="https://formcarry.com/s/LhmDo0SwOHr"
          method="POST"
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
          </label>
          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 6,
              background: "#4f8cff",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              marginTop: 8,
              width: "100%",
              boxSizing: "border-box",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Send
          </button>
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>{error}</p>
          )}
        </form>
      )}
      {/* Formcarry.js CDN script for form integration */}
      <script src="https://carrier.formcarry.com/js/v1.js"></script>
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
