export default function ContactSection() {
  return (
    <section className="contact-section">
      <h2>Contact</h2>
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
