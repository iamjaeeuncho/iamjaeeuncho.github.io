import "./ProjectsWindow.css";

const projects = [
  {
    title: "ERP System Improvement",
    period: "Oct 2025 - Dec 2025",
    team: "Green Oil Inc. · Planner 1 + Fullstack Developer 1",
    stack: ["PHP", "JavaScript", "jQuery", "Ajax", "MySQL", "HTML5", "CSS3"],
    summary:
      "Improved a legacy ERP system by adding multi-file upload, redesigning screens, and upgrading the map-based management page with real-time status updates.",
    highlights: [
      "Built multi-file upload and server storage flow",
      "Improved request and dispatch UX with filters and async detail loading",
      "Enhanced Google Maps interactions with clustering and hover states",
    ],
    role: "Fullstack Developer",
    type: "Work",
    icon: "🛠️",
    github: "",
    video: "",
  },
  {
    title: "4CutStudio",
    period: "Aug 2024 - Sep 2024",
    team: "KOSA · Fullstack Developers 3",
    stack: [
      "Java 17",
      "Spring Boot 3",
      "Vue 2",
      "WebRTC",
      "WebSocket",
      "AWS",
      "Oracle Cloud",
      "Docker",
      "S3",
    ],
    summary:
      "Built an online photo booth service with video chat, live photo capture, real-time decoration sync, and image storage to AWS S3.",
    highlights: [
      "Set up frontend, backend, AWS, and OCI environments",
      "Implemented photo capture and community CRUD features",
      "Built popular-post logic based on views and likes",
    ],
    github: "https://github.com/iamjaeeuncho/ClickPic",
    video: "https://github.com/iamjaeeuncho/ClickPic",
    role: "Planning 70% · Development 40%",
    type: "Education",
    icon: "📸",
  },
  {
    title: "OH MY STREET FOOD!",
    period: "Jun 2024 - Jul 2024",
    team: "KOSA · Fullstack Developers 5",
    stack: [
      "Java 8",
      "Spring 5",
      "JSP",
      "Bootstrap",
      "jQuery",
      "WebSocket",
      "Oracle Cloud",
      "MyBatis",
    ],
    summary:
      "Developed a street food service with store search, nearby listings, ordering, payment flow, and real-time chat for verified sellers.",
    highlights: [
      "Built popular keyword and search ranking features",
      "Improved store list UX with sorting and infinite scroll",
      "Integrated PortOne payment API for ordering flow",
    ],
    github: "https://github.com/iamjaeeuncho/OhMyStreetFood",
    video: "",
    role: "Planning 70% · Development 30%",
    type: "Awarded",
    icon: "🍢",
  },
  {
    title: "DROP THE BID!",
    period: "Jul 2024 - Aug 2024",
    team: "KOSA · Fullstack Developers 4",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Vue",
      "Vuetify",
      "STOMP",
      "WebSocket",
      "Oracle Cloud",
    ],
    summary:
      "Created a used-item auction platform with bidding, auction results, and real-time 1:1 chat between buyers and sellers.",
    highlights: [
      "Implemented STOMP-based real-time chat",
      "Designed user-to-room mapping logic for chat sessions",
      "Built product-based 1:1 messaging experience",
    ],
    github: "https://github.com/iamjaeeuncho/DropTheBid",
    video: "",
    role: "Planning 30% · Development 10%",
    type: "Education",
    icon: "🏷️",
  },
  {
    title: "Lottery Number Generator",
    period: "Apr 2024 - May 2024",
    team: "KOSA · Fullstack Developers 2",
    stack: ["Java 17", "Swing", "PL/SQL", "HikariCP", "Lombok"],
    summary:
      "Built a desktop lottery number generator supporting manual, semi-auto, and weighted random generation based on past winning data.",
    highlights: [
      "Designed weighted random algorithm from historical winning frequency",
      "Implemented number history management per user",
      "Built automatic, semi-automatic, and manual generation flows",
    ],
    github: "https://github.com/iamjaeeuncho/LotteryProject",
    video: "",
    role: "Planning 70% · Development 50%",
    type: "Education",
    icon: "🎲",
  },
];

export default function ProjectsWindow() {
  return (
    <div className="projects-window">
      <section className="projects-hero">
        <h1 className="projects-title">Check out my latest work</h1>
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
                <span>{project.role}</span>
              </div>

              <p className="project-summary">{project.summary}</p>

              <ul className="project-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-footer">
                <div className="project-tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                {(project.github || project.video) && (
                  <div className="project-links">
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
                        className="project-link"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
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