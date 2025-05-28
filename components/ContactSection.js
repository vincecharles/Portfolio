export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: 24 }}>
        Interested in working together or just want to say hi? Fill out the form
        below or email me directly.
      </p>
      <form
        className="contact-form"
        action="https://formspree.io/f/mnqkzqzv"
        method="POST"
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
      </form>
    </section>
  );
}
