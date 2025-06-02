import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("https://formcarry.com/s/LhmDo0SwOHr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.code === 200) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(result.message || "Submission failed.");
      }
    } catch (err) {
      setError("Submission failed.");
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
      ) : (
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          style={{
            maxWidth: 500,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Message
            <textarea name="message" required />
          </label>
          <button type="submit">Send</button>
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>{error}</p>
          )}
        </form>
      )}
    </section>
  );
}
