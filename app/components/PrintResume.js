"use client";

// ──────────────────────────────────────────────
// PrintResume.js
// Hidden on screen — displayed ONLY when printing.
// Renders a professional one-page A4 resume.
// ──────────────────────────────────────────────

export default function PrintResume({ member, memberProjects }) {
  if (!member) return null;

  const topProjects = memberProjects?.slice(0, 3) || [];

  return (
    <div id="print-resume">
      {/*
        A4 @ 96dpi ≈ 794px wide.
        We set explicit A4 sizing via @media print in globals.css.
        This wrapper is purely for the screen preview alignment.
      */}
      <div className="print-resume-page">

        {/* ── HEADER ─────────────────────────────── */}
        <div className="pr-header">
          <div className="pr-header-left">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="pr-avatar" />
            ) : (
              <div className="pr-avatar-initials">{member.initials}</div>
            )}
          </div>
          <div className="pr-header-right">
            <h1 className="pr-name">{member.name}</h1>
            <p className="pr-role">{member.role}</p>
            <p className="pr-badge">{member.badge}</p>
            <div className="pr-contacts">
              {member.email && (
                <span className="pr-contact-item">✉ {member.email}</span>
              )}
              {member.github && (
                <span className="pr-contact-item">
                  ⌥ {member.github.replace("https://", "")}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pr-divider" />

        {/* ── BODY ─────────────────────────────────── */}
        <div className="pr-body">

          {/* LEFT COLUMN */}
          <div className="pr-col-left">

            {/* Profile Summary */}
            <div className="pr-section">
              <h2 className="pr-section-title">PROFILE SUMMARY</h2>
              <p className="pr-text">{member.bio}</p>
            </div>

            {/* Education */}
            <div className="pr-section">
              <h2 className="pr-section-title">EDUCATION</h2>
              <p className="pr-edu-school">{member.education?.highlight}</p>
              <p className="pr-edu-sub">{member.education?.sub}</p>
              <p className="pr-text">{member.education?.text}</p>
            </div>

            {/* Key Skills */}
            <div className="pr-section">
              <h2 className="pr-section-title">KEY SKILLS</h2>
              <div className="pr-skills">
                {member.skills?.map((s, i) => (
                  <span key={i} className="pr-skill-tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="pr-section">
              <h2 className="pr-section-title">CAREER OBJECTIVE</h2>
              <p className="pr-text">{member.goals}</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="pr-col-right">

            {/* Technical Competencies */}
            <div className="pr-section">
              <h2 className="pr-section-title">TECHNICAL COMPETENCIES</h2>
              {member.sections?.map((sec, i) => (
                <div key={i} className="pr-comp-block">
                  <h3 className="pr-comp-title">{sec.title}</h3>
                  <ul className="pr-comp-list">
                    {sec.items?.map((item, j) => (
                      <li key={j} className="pr-comp-item">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            {topProjects.length > 0 && (
              <div className="pr-section">
                <h2 className="pr-section-title">SELECTED PROJECTS</h2>
                {topProjects.map((p, i) => (
                  <div key={i} className="pr-project-block">
                    <div className="pr-project-header">
                      <span className="pr-project-title">{p.title}</span>
                      <span className="pr-project-tags">
                        {p.tags?.slice(0, 3).join(" · ")}
                      </span>
                    </div>
                    <p className="pr-project-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────── */}
        <div className="pr-footer">
          <span>University of the Thai Chamber of Commerce (UTCC) · Computer Science</span>
          <span>CR7XMESSI AND YAMAL CHAMPION | Software &amp; AI Engineering Team</span>
        </div>
      </div>
    </div>
  );
}
