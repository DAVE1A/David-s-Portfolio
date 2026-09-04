import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Camera, Image as ImageIcon } from "lucide-react";
import profilePhoto from "./assets/PROFILEIMAGE.png";
import profilePhotoag from "./assets/agri.png";
import profilePhotore from "./assets/rehoboth.png";
import "./App.css";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];


const PROFILE_PHOTO_URL = profilePhoto;
const AGRISENSE_SHOT_URL = profilePhotoag;
const HOSPITAL_SHOT_URL = profilePhotore;

const AGRISENSE_STATS = [
  { value: "97.5%", label: "Crop model accuracy" },
  { value: "94.3%", label: "Climate risk accuracy" },
  { value: "2,200", label: "Training records" },
  { value: "22", label: "Crop classes" },
];

const STACK_GROUPS = [
  { heading: "Backend & ML", items: "Python, Flask, scikit-learn, pandas, NumPy, SQLite" },
  { heading: "Frontend", items: "React, React Router, Recharts" },
  { heading: "Integrations", items: "Open-Meteo API, Anthropic Claude API" },
];

const AGRISENSE_INNOVATIONS = [
  "Confidence scores are rescaled from raw model probabilities into a meaningful 55–95% range instead of near-zero values.",
  "Recommendations use live Open-Meteo weather data for the farmer's location, not fixed estimates.",
  "Climate risk output is translated into plain-language, actionable guidance rather than a raw label.",
  "A Claude-powered chatbot is pre-loaded with the farmer's own soil, weather, and crop results, so advice is specific to their farm.",
];

const HOSPITAL_STATS = [
  { value: "+30%", label: "Online patient inquiries" },
  { value: "-40%", label: "Manual scheduling time" },
  { value: "+40%", label: "Mobile usability" },
];
const HOSPITAL_STACK = "HTML, CSS, JavaScript, JSON";

const EXPERIENCE_ITEMS = [
  {
    role: "Software Engineering Intern",
    org: "SQI Software",
    location: "Osun, Nigeria",
    period: "Apr 2025 – Oct 2025",
    points: [
      "Collaborated on real-world website projects using HTML, CSS, and JavaScript, strengthening core front-end fundamentals.",
      "Found and fixed UI bugs using browser devtools and Git, smoothing the experience on deployed sites.",
      "Shadowed senior developers and applied their feedback to personal tasks, speeding up coding and debugging.",
    ],
  },
  {
    role: "Software Engineer (Part-Time)",
    org: "Rehoboth Specialist Hospital",
    location: "Osun, Nigeria",
    period: "Sept 2024 – Dec 2024",
    points: [
      "Designed and deployed a responsive multi-page hospital website with HTML, CSS, and JavaScript, increasing online patient inquiries by 30%.",
      "Digitalized appointment and patient-record workflows, cutting manual scheduling time by 40%.",
      "Built a lightweight local database tool with JavaScript and JSON to improve record-retrieval accuracy.",
    ],
  },
];

const SKILL_GROUPS = [
  { heading: "Languages", items: ["Java", "Python", "JavaScript", "C++", "SQL"] },
  { heading: "Frameworks & tools", items: ["React.js", "Node.js", "Bootstrap", "Tailwind CSS", "Spring Boot", "Git"] },
  { heading: "Technical", items: ["Machine Learning", "Data Analysis", "Algorithm Design", "Web Design", "Problem-Solving"] },
];

const CONTACT_LINKS = [
  { icon: Mail, label: "Email", value: "adedejidavid2000@gmail.com", href: "mailto:adedejidavid2000@gmail.com" },
  { icon: Phone, label: "Phone", value: "0707 933 1420", href: "tel:+2347079331420" },
  { icon: Github, label: "GitHub", value: "github.com/DAVE1A", href: "https://github.com/DAVE1A" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/adedejidavid2000", href: "https://www.linkedin.com/in/adedejidavid2000/" },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}


function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function PhotoFrame({ src, alt, placeholderLabel }) {
  return (
    <div className="pf-photo-frame">
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="pf-photo-placeholder">
          <Camera size={28} strokeWidth={1.2} />
          <span>{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}

function ShotFrame({ src, alt, placeholderLabel }) {
  return (
    <div className="pf-shot">
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="pf-shot-placeholder">
          <ImageIcon size={22} strokeWidth={1.2} />
          <span>{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pf-root">
      <nav className={`pf-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="pf-container pf-nav-inner">
          <a href="#top" className="pf-wordmark">Adedeji David</a>
          <ul className="pf-nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <button className="pf-menu-btn" aria-expanded={menuOpen} aria-controls="pf-mobile-menu" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <div id="pf-mobile-menu" className={`pf-mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </div>
      </nav>

      <main id="top">
        <header className="pf-hero pf-container">
          <div className="pf-hero-grid">
            <Reveal>
              <div className="pf-hero-eyebrow">Computer Science — Landmark University</div>
              <h1>Adedeji David Toluwani</h1>
              <p>
                I build machine learning and web tools aimed at real problems — from a hospital
                website that cut manual scheduling time by 40%, to AGRISENSE, an AI system that
                helps Nigerian farmers decide what to plant. Graduating in 2026, looking for a
                role in AI/ML or software engineering.
              </p>
              <div className="pf-hero-actions">
                <a className="pf-btn pf-btn-primary" href="#work">See my work</a>
                <a className="pf-btn pf-btn-secondary" href="#contact">Get in touch</a>
              </div>
            </Reveal>
            <Reveal>
              <PhotoFrame
                src={PROFILE_PHOTO_URL}
                alt="Adedeji David Toluwani"
                placeholderLabel="Add your photo — replace PROFILE_PHOTO_URL in App.jsx"
              />
            </Reveal>
          </div>
        </header>

        <section id="work" className="pf-section pf-container">
          <Reveal>
            <div className="pf-section-head">
              <h2>Selected work</h2>
              <p>From a production website built for a hospital client to a full ML product with its own models and interface.</p>
            </div>
          </Reveal>

          <Reveal as="article" className="pf-project">
            <ShotFrame
              src={AGRISENSE_SHOT_URL}
              alt="AGRISENSE screenshot"
              placeholderLabel="Add a screenshot — replace AGRISENSE_SHOT_URL"
            />
            <div>
              <div className="pf-project-title">AGRISENSE</div>
              <div className="pf-project-role">AI crop &amp; climate risk advisor for Nigerian farmers</div>
              <p className="pf-project-desc">
                A web platform that helps Nigerian smallholder farmers decide what to plant and when.
                A farmer enters their location, soil type, and planting month; AGRISENSE pulls live weather
                data, runs it through two machine learning models, and returns the top five recommended
                crops with confidence scores, a climate risk report, farming advice, and a chatbot that
                already knows the farmer's specific conditions.
              </p>
              <div className="pf-stats-row">
                {AGRISENSE_STATS.map((s) => (
                  <div className="pf-stat" key={s.label}>
                    <div className="value">{s.value}</div>
                    <div className="label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="pf-stack">
                {STACK_GROUPS.map((g) => (
                  <div className="pf-stack-group" key={g.heading}>
                    <h4>{g.heading}</h4>
                    <div className="items">{g.items}</div>
                  </div>
                ))}
              </div>
              <ul className="pf-innovations">
                {AGRISENSE_INNOVATIONS.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="pf-project-links">
                <a className="pf-project-link" href="https://github.com/DAVE1A" target="_blank" rel="noopener noreferrer">
                  View on GitHub <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" className="pf-project reverse">
            <ShotFrame
              src={HOSPITAL_SHOT_URL}
              alt="Hospital Website System screenshot"
              placeholderLabel="Add a screenshot — replace HOSPITAL_SHOT_URL"
            />
            <div>
              <div className="pf-project-title">Hospital Website System</div>
              <div className="pf-project-role">Rehoboth Specialist Hospital — part-time engineering role</div>
              <p className="pf-project-desc">
                A multi-page hospital website with responsive design and embedded media, plus a custom
                JavaScript-based database manager for securely storing and retrieving patient data.
              </p>
              <div className="pf-stats-row">
                {HOSPITAL_STATS.map((s) => (
                  <div className="pf-stat" key={s.label}>
                    <div className="value">{s.value}</div>
                    <div className="label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="pf-stack">
                <div className="pf-stack-group">
                  <h4>Stack</h4>
                  <div className="items">{HOSPITAL_STACK}</div>
                </div>
              </div>
              <div className="pf-project-links">
                <a className="pf-project-link" href="https://github.com/DAVE1A" target="_blank" rel="noopener noreferrer">
                  View on GitHub <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="experience" className="pf-section pf-container">
          <Reveal><div className="pf-section-head"><h2>Experience</h2></div></Reveal>
          <div>
            {EXPERIENCE_ITEMS.map((job) => (
              <Reveal as="div" className="pf-exp-item" key={job.role + job.org}>
                <div className="pf-exp-meta">
                  <div className="period">{job.period}</div>
                  <div className="location">{job.location}</div>
                </div>
                <div className="pf-exp-body">
                  <h3>{job.role}</h3>
                  <div className="org">{job.org}</div>
                  <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="about" className="pf-section pf-container">
          <Reveal><div className="pf-section-head"><h2>About</h2></div></Reveal>
          <Reveal className="pf-about-grid">
            <div>
              <p>
                I'm a computer science student with hands-on software engineering experience and a strong
                pull toward AI and machine learning. I've shipped a production website for a hospital
                client, worked as an intern fixing real UI bugs in a live codebase, and built AGRISENSE end
                to end — dataset, models, backend, and a working interface with a chatbot advisor.
              </p>
              <p>
                I'm committed to learning in public: right now that means going deeper into machine
                learning and picking up React properly, not just enough to ship one project. I'm looking
                for a role where I can keep doing both — applied ML and front-end work — alongside people
                who'll push my standards up.
              </p>
            </div>
            <div className="pf-edu">
              <h4>B.S. Computer Science</h4>
              <div className="school">Landmark University, Kwara, Nigeria</div>
              <div className="years">2022 – 2026 (expected)</div>
              <ul>
                <li>Concentrations: Software Development / Machine Learning</li>
                <li>Data Structures &amp; Algorithms</li>
                <li>Machine Learning &amp; Artificial Intelligence</li>
                <li>Object-Oriented Programming</li>
                <li>Statistics &amp; Applications</li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="pf-section pf-container">
          <Reveal><div className="pf-section-head"><h2>Skills</h2></div></Reveal>
          <Reveal className="pf-skills-grid">
            {SKILL_GROUPS.map((g) => (
              <div className="pf-skill-group" key={g.heading}>
                <h3>{g.heading}</h3>
                <ul className="pf-skill-list">
                  {g.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </Reveal>
        </section>

        <section id="contact" className="pf-section pf-container">
          <Reveal>
            <div className="pf-section-head">
              <h2>Get in touch</h2>
              <p>Open to roles in AI/ML and web development — reach me directly.</p>
            </div>
          </Reveal>
          <Reveal className="pf-contact-list">
            {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
              <a className="pf-contact-item" href={href} key={label}>
                <span className="k">{label}</span>
                <span className="v">{value}</span>
              </a>
            ))}
          </Reveal>
        </section>
      </main>

      <footer className="pf-container">
        <div className="pf-footer-inner">
          <span>&copy; {new Date().getFullYear()} Adedeji David Toluwani</span>
          <span>Built with React</span>
        </div>
      </footer>
    </div>
  );
}
