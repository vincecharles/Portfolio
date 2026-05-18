"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFilePdf, FaRobot, FaBriefcase, FaEye, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

const resumeVersions = [
  {
    id: 'ats',
    label: 'ATS Resume',
    icon: <FaRobot />,
    description: 'Optimized for Applicant Tracking Systems',
    file: '/images/Vince_de_Guzman_ATS_Resume.pdf',
    downloadName: 'Vince_de_Guzman_ATS_Resume.pdf',
    color: '#4f8cff',
    badge: 'ATS Optimized',
  },
  {
    id: 'portfolio',
    label: 'Portfolio Resume',
    icon: <FaBriefcase />,
    description: 'Full portfolio showcase resume',
    file: '/images/Vince-Charles-Portfolio.pdf',
    downloadName: 'Vince_Charles_de_Guzman_Resume.pdf',
    color: '#a78bfa',
    badge: 'Portfolio',
  },
];

export default function ResumePage() {
  const [activeVersion, setActiveVersion] = useState('ats');
  const [loading, setLoading] = useState(true);

  const current = resumeVersions.find(v => v.id === activeVersion);

  return (
    <div className="resume-page-wrapper">
      {/* Background glow orbs */}
      <div className="resume-orb resume-orb-1" />
      <div className="resume-orb resume-orb-2" />

      <div className="resume-page-inner">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="resume-back-link">
            <FaChevronLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="resume-header-block"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="resume-title-row">
            <FaFilePdf className="resume-title-icon" />
            <div>
              <h1 className="resume-page-title">My Resume</h1>
              <p className="resume-page-subtitle">Vince Charles de Guzman — Full Stack Developer</p>
            </div>
          </div>
        </motion.div>

        {/* Version Selector */}
        <motion.div
          className="resume-version-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {resumeVersions.map((v) => (
            <button
              key={v.id}
              id={`resume-tab-${v.id}`}
              className={`resume-version-btn ${activeVersion === v.id ? 'active' : ''}`}
              onClick={() => {
                setActiveVersion(v.id);
                setLoading(true);
              }}
              style={activeVersion === v.id ? { '--btn-color': v.color } : {}}
            >
              <span className="resume-btn-icon">{v.icon}</span>
              <div className="resume-btn-text">
                <span className="resume-btn-label">{v.label}</span>
                <span className="resume-btn-desc">{v.description}</span>
              </div>
              {activeVersion === v.id && (
                <motion.span
                  className="resume-active-badge"
                  layoutId="active-badge"
                  style={{ background: v.color }}
                >
                  Active
                </motion.span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Action Bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVersion + '-bar'}
            className="resume-action-bar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="resume-action-left">
              <span className="resume-badge" style={{ background: current.color }}>
                {current.icon}
                {current.badge}
              </span>
              <span className="resume-action-hint">
                <FaEye size={12} />
                Preview below
              </span>
            </div>
            <a
              id={`download-${activeVersion}`}
              href={current.file}
              download={current.downloadName}
              className="resume-download-btn"
              style={{ '--btn-color': current.color }}
            >
              <FaDownload size={14} />
              Download {current.label}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* PDF Viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVersion + '-viewer'}
            className="resume-viewer-container"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            {loading && (
              <div className="resume-loading-overlay">
                <div className="resume-spinner" />
                <p>Loading resume...</p>
              </div>
            )}
            <iframe
              src={`${current.file}#toolbar=1&navpanes=0`}
              className="resume-iframe"
              title={current.label}
              onLoad={() => setLoading(false)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="resume-bottom-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Want to get in touch?</p>
          <Link href="/#contact" className="resume-contact-link">
            Contact Me →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
