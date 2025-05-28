export default function ResumePage() {
  return (
    <div className="resume-page">
      <h1>Resume</h1>
      <a href="/images/de-Guzman_Resume.pdf" download>
        Download PDF
      </a>
      <iframe
        src="/images/de-Guzman_Resume.pdf"
        width="100%"
        height="600px"
        title="Resume"
      />
    </div>
  );
}
