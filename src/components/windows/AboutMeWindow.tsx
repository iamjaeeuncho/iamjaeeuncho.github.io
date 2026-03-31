import "./AboutMeWindow.css";

const experiences = [
  {
    title: "Software Programmer Intern",
    company: "Green Oil Inc.",
    location: "Toronto, Canada",
    period: "Aug 2025 - Dec 2025",
    description:
      "Improved a legacy PHP-based ERP system, enhanced frontend features with JavaScript and jQuery, maintained the WordPress site, and supported digital transformation using Google AppSheet.",
  },
  {
    title: "Business Analyst",
    company: "FASSTO",
    location: "Seoul, South Korea",
    period: "Nov 2021 - Jul 2022",
    description:
      "Analyzed large datasets using MySQL, built BI dashboards in Google Data Studio, and resolved settlement issues to improve financial accuracy and system stability.",
  },
  {
    title: "Consultant",
    company: "Freelance",
    location: "Seoul, South Korea",
    period: "Nov 2020 - Oct 2021",
    description:
      "Provided digital marketing consulting, including content strategy, social media planning, audience targeting, and performance optimization for local community projects.",
  },
  {
    title: "Data Analyst",
    company: "Lab543 at Jiwoo Company",
    location: "Seoul, South Korea",
    period: "Jan 2020 - Oct 2020",
    description:
      "Analyzed user data with Google Analytics, conducted A/B testing, built BI dashboards, and used Python for data processing and visualization.",
  },
  {
    title: "Global E-commerce Seller",
    company: "Self-employed",
    location: "Seoul, South Korea",
    period: "Apr 2018 - Oct 2019",
    description:
      "Managed global e-commerce stores across multiple platforms, handling product sourcing, marketing, logistics, and customer service end-to-end.",
  },
  {
    title: "E-commerce Marketing Assistant",
    company: "DORCO",
    location: "London, UK",
    period: "May 2016 - Jan 2018",
    description:
      "Supported UK e-commerce operations, including digital marketing, KPI monitoring, and website UI/UX improvements.",
  },
  {
    title: "Young Professional Intern",
    company: "KOICA",
    location: "Yangon, Myanmar",
    period: "May 2015 - Nov 2015",
    description:
      "Supported international development projects, conducted field monitoring, evaluated proposals, and coordinated with government, NGOs, and private sectors.",
  },
];

const skills = {
  languages: ["Java", "JavaScript", "TypeScript", "Python", "PHP", "HTML5", "CSS3"],
  frontend: ["React", "Vue", "Tailwind CSS", "Bootstrap"],
  backend: ["Spring", "Spring Boot", "Node.js (Express)", "MyBatis"],
  database: ["MySQL", "Oracle (PL/SQL)", "SQLite"],
  infra: ["AWS (EC2, S3, Amplify)", "Docker"], 
  tools: ["Git", "VS Code", "IntelliJ", "Eclipse"],
};

export default function AboutMeWindow() {
  return (
    <div className="about-window">
      <section className="about-hero">
        <img className="about-avatar" src="/emoji.png" alt="avatar" />

        <h1 className="about-name">JaeEun Cho</h1>
        <p className="about-role">Fullstack Software Developer</p>

        <div className="about-meta">
          <span>☀︎ Seoul, Korea</span>
          <span>☏ redjoun@gmail.com</span>
          <span>
            ☺︎{" "}
            <a href="https://www.linkedin.com/in/jaeeuncho" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </span>
          <span>
            ♧{" "}
            <a href="https://github.com/iamjaeeuncho" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </span>
          <span>
            ✏︎{" "}
            <a href="https://iamjaeeuncho.tistory.com" target="_blank" rel="noreferrer">
              Blog
            </a>
          </span>
        </div>
      </section>

      <section className="about-card">
        <p>I always keep this line in mind: “Life is short and only happens once.” This mindset drives me to explore a wide range of opportunities and experiences.</p>
        <p>I've explored different fields and constantly challenged myself with new things. Some attempts ended in failure, but instead of discouraging me, they sparked my curiosity about unfamiliar areas and helped me uncover new possibilities.</p>
        <p>While working as a digital marketer and data analyst, I began to want to build something of my own. This became the turning point that led me to pursue a career in software development.</p>
        <p>At first, I started programming simply to create my own service. However, as I continued, I found it truly enjoyable and rewarding. Solving problems through code gave me a strong sense of accomplishment, and learning new technologies made me want to grow further in this field.</p>    
        <p>I aim to use my diverse background to create services that provide meaningful value to users. I hope to continue growing as a developer who builds impactful and thoughtful solutions.</p>
        <br />
        <h2>T.M.I.</h2>
        <p>🗺️ Been to 33 countries across 4 continents. World domination still in progress!</p>
        <p>📸 Amateur street photographer capturing people’s everyday lives. Currently on pause due to privacy concerns.</p>
        <p>🎤 Arts high school graduate, former band vocalist. Now available for karaoke.</p>
        <p>🍻 Serious about good food and drinks. Nom nom...</p>
      </section>

      <section className="about-card">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((item) => (
            <div className="timeline-item" key={`${item.company}-${item.period}`}>
              <h3>
                {item.title} <span>· {item.company}</span>
              </h3>
              <p className="timeline-meta">
                {item.location} · {item.period}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-card">
        <h2>Education</h2>
        <div className="education-item">
          <h3>Bachelor of Computer Science, Korea National Open University</h3>
          <p>Mar 2026 - Present</p>
        </div>
        <div className="education-item">
          <h3>Bachelor of Economics, Kookmin University</h3>
          <p>Mar 2009 - Feb 2015</p>
        </div>
      </section>

      <section className="about-card">
        <h2>Technical Skills</h2>

        <div className="skill-group">
          <h3>Languages</h3>
          <div className="chip-list">
            {skills.languages.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-group">
          <h3>Frontend</h3>
          <div className="chip-list">
            {skills.frontend.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-group">
          <h3>Backend</h3>
          <div className="chip-list">
            {skills.backend.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-group">
          <h3>Database</h3>
          <div className="chip-list">
            {skills.database.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-group">
          <h3>Infrastructure</h3>
          <div className="chip-list">
            {skills.infra.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-group">
          <h3>Tools</h3>
          <div className="chip-list">
            {skills.tools.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}