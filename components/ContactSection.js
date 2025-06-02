"use client";

import { useState, useEffect, useRef } from "react";
import formcarry from "@formcarry/formcarry-js";

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
    </section>
  );
}
