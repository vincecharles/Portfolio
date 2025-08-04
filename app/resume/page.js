"use client";
import { useState } from 'react';

export default function ResumePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="resume-page">
      <div className="resume-container">
        <div className="resume-header">
          <h1 className="resume-title">My Resume</h1>
          <p className="resume-subtitle">Vince Charles de Guzman</p>
          <a 
            href="/images/Vince-Charles-Portfolio.pdf" 
            download="Vince-Charles-Portfolio.pdf"
            className="download-btn"
          >
            📄 Download PDF
          </a>
        </div>
        
        <div className="resume-viewer">
          {loading && (
            <div className="resume-loading">
              <div className="loading-spinner"></div>
              <p>Loading resume...</p>
            </div>
          )}
          <iframe
            src="/images/Vince-Charles-Portfolio.pdf"
            className="resume-iframe"
            title="Vince Charles Resume"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
