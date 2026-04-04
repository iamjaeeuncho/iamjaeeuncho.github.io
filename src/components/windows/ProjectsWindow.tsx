import "./ProjectsWindow.css";

type ProjectStack = {
  language: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  infra: string[];
  etc: string[];
};

type ProjectItem = {
  title: string;
  period: string;
  team: string;
  stack: ProjectStack;
  summary: string;
  highlights: string[];
  type: "Work" | "Education" | "Awarded";
  icon: string;
  github: string;
  video: string;
  document: string;
};

const projects: ProjectItem[] = [
  {
    title: "ERP System Improvement",
    period: "Oct 2025 - Dec 2025, 7 weeks",
    team: "Green Oil Inc.",
    stack: {
      language: ["PHP", "JavaScript"],
      frontend: ["HTML5", "CSS3", "jQuery"],
      backend: [],
      database: ["MySQL"],
      infra: [],
      etc: ["Ajax", "Google Maps API", "Git"],
    },
    summary:
      "Enhanced a legacy PHP-based ERP system for waste oil collection by improving file handling, dispatch workflows, and map-based management UX.",

    highlights: [
      "Developed multi-file upload and server storage logic for installation photo management",
      "Redesigned request and dispatch workflows with dynamic UI panel, filtering, and Ajax-based data loading",
      "Upgraded Google Maps-based management with marker clustering, interactive states, and real-time updates without full page reload",
    ],
    type: "Work",
    icon: "🛠️",
    github: "",
    video: "",
    document: "",
  },
  {
    title: "4CutStudio",
    period: "Aug 2024 - Sep 2024, 4 weeks",
    team: "KOSA, 3 developers",
    stack: {
      language: ["Java 17", "JavaScript", "HTML5", "CSS3"],
      frontend: ["Vue 2"],
      backend: ["Spring Boot 3"],
      database: ["Oracle"],
      infra: ["AWS EC2", "AWS Amplify", "AWS S3", "Oracle Cloud", "Docker"],
      etc: ["OpenVidu", "WebRTC", "WebSocket", "Git"],
    },
    summary:
      "Built an online photo booth service with video chat, live photo capture, real-time decoration sync, and image storage.",
    highlights: [
      "Built advanced search with IP-based trending keyword aggregation",
      "Optimized store listing UX with multi-criteria sorting and infinite scrolling",
      "Integrated PortOne payment API to implement end-to-end cart and checkout flow",
    ],
    type: "Education",
    icon: "📸",
    github: " https://github.com/iamjaeeuncho/ClickPic",
    video: "https://drive.google.com/file/d/1aVEHhEVAdK-oF8rqEQY8lMP7bdVbTtHa/view?usp=sharing",
    document:
      "https://drive.google.com/file/d/1wQq8ccyDW3kzRQ7M88L74cqMDQPeWNv5/view?usp=sharing",
  },
  {
    title: "OH MY STREET FOOD!",
    period: "Jun 2024 - Jul 2024, 4 weeks",
    team: "KOSA, 5 developers",
    stack: {
      language: ["Java 8", "JavaScript", "HTML5", "CSS3"],
      frontend: ["JSP", "Bootstrap", "jQuery"],
      backend: ["Spring 5"],
      database: ["Oracle", "MyBatis"],
      infra: ["Oracle Cloud"],
      etc: ["Ajax", "WebSocket", "PortOne Payment API", "Git"],
    },
    summary:
      "Developed a street food platform featuring nearby store discovery, ordering and payment, and 1:1 chat for verified store owners.",
    highlights: [
      "Integrated the PortOne payment API and developed cart and order flows",
      "Enhanced store listing UX with distance display, sorting, and infinite scroll",
      "Built popular-keyword logic based on user IP and improved store search experience",
    ],
    type: "Awarded",
    icon: "🍢",
    github: "https://github.com/iamjaeeuncho/OhMyStreetFood",
    video: "https://drive.google.com/file/d/1erg2nDzOfcpUh77QEqXzBtC_eX1kYOn-/view?usp=sharing",
    document:
      "https://drive.google.com/file/d/12tiwzCeP_RbSicbDMGLRaos-ceahSzuf/view?usp=sharing",
  },
  {
    title: "DROP THE BID!",
    period: "Jul 2024 - Aug 2024, 2 weeks",
    team: "KOSA, 4 developers",
    stack: {
      language: ["Java 21", "JavaScript", "HTML5", "CSS3"],
      frontend: ["Vue", "Vuetify"],
      backend: ["Spring Boot 3"],
      database: ["Oracle", "MyBatis"],
      infra: ["Oracle Cloud"],
      etc: ["STOMP", "WebSocket", "Git"],
    },
    summary:
      "Built a used-item auction platform with bidding, auction result handling, and real-time 1:1 chat between buyers and sellers.",
    highlights: [
      "Built real-time 1:1 chat between buyers and sellers using WebSocket"
    ],
    type: "Education",
    icon: "🏷️",
    github: "https://github.com/iamjaeeuncho/DropTheBid",
    video: "",
    document:
      "https://drive.google.com/file/d/1i4b9-TkInyk-QQ4ykMJWgZkQgPwNuQ95/view?usp=sharing",
  },
  {
    title: "Lottery Number Generator",
    period: "Apr 2024 - May 2024, 2 weeks",
    team: "KOSA, 2 developers",
    stack: {
      language: ["Java 17"],
      frontend: ["Swing"],
      backend: [],
      database: ["Oracle", "PL/SQL"],
      infra: [],
      etc: ["HikariCP", "Lombok", "Git"],
    },
    summary:
      "Built a desktop lottery number generator with weighted random generation based on past winning records.",
    highlights: [
      "Implemented automatic, semi-automatic, and manual lottery number generation modes",
      "Designed a weighted random algorithm based on historical winning number frequency",
    ],
    type: "Education",
    icon: "🎲",
    github: "https://github.com/iamjaeeuncho/LotteryProject",
    video: "https://drive.google.com/file/d/1X6YeENor38MSvERclu8XX47WjVMjmAU3/view?usp=sharing",
    document: "https://drive.google.com/file/d/1WJchzHKkTN0IFLXD2JdCOSIlkE8t2lL9/view?usp=sharing",
  },
  {
    title: "Developers in Korea, Devko",
    period: "Jan 2024 - Feb 2024, 3 weeks",
    team: "Sesac, 3 developers",
    stack: {
      language: ["JavaScript", "HTML5", "CSS3"],
      frontend: ["React", "Tailwind CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MySQL"],
      infra: ["AWS EC2", "AWS S3", "AWS RDS"],
      etc: ["Google OAuth 2.0", "RSS", "Git"],
    },
    summary:
      "Built a developer community platform with social login, content sharing, and event-based features.",
    highlights: [
      "Implemented Google OAuth 2.0-based social login and user management system",
      "Built RSS-based content aggregation to collect and display external tech blog posts",
      "Designed and developed RESTful APIs for posts, comments, likes, tags, and view count features",
    ],
    type: "Education",
    icon: "💬",
    github: "https://github.com/iamjaeeuncho/DeveloperCommunityProject",
    video: "https://drive.google.com/file/d/1b7bkKOP3elmajVIJ-SmKD6xNX-RnpFQx/view?usp=sharing",
    document: "https://drive.google.com/file/d/15K6FrWy2hlZpHPYI3NUDosRipIrMciiB/view?usp=sharing",
  }
];

export default function ProjectsWindow() {
  return (
    <div className="projects-window">
      <section className="projects-hero">
        <h1 className="projects-title">Check out my work</h1>
        <p className="projects-description">
          I've worked with a focus on Java and JavaScript,
          <br />
          but still exploring other technologies that catch my interest!
        </p>
      </section>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project-row" key={project.title}>
            <div className="project-icon">{project.icon}</div>

            <div className="project-content">
              <div className="project-header">
                <div className="project-title-wrap">
                  <h2>{project.title}</h2>
                  <p className="project-period">{project.period}</p>
                </div>

                <span className={`project-type ${project.type.toLowerCase()}`}>
                  {project.type}
                </span>
              </div>

              <div className="project-meta">
                <span>{project.team}</span>
              </div>

              <p className="project-summary">{project.summary}</p>

              <ul className="project-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-footer">
                <div className="project-tags">
                  {Object.entries(project.stack).flatMap(([category, items]) =>
                    items.map((item) => (
                      <span
                        key={`${project.title}-${category}-${item}`}
                        className={`tag ${category}`}
                      >
                        {item}
                      </span>
                    ))
                  )}
                </div>

                {(project.github || project.video || project.document) && (
                  <div className="project-links">
                    {project.document && (
                      <a
                        className="project-link document"
                        href={project.document}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Document ◼︎
                      </a>
                    )}

                    {project.video && (
                      <a
                        className="project-link video"
                        href={project.video}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Video ▶
                      </a>
                    )}

                    {project.github && (
                      <a
                        className="project-link github"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗︎
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}