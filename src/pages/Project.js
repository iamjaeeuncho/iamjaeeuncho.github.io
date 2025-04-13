import React from "react";
import Article from "../components/ListCompo";
import SkillBundle from "../components/SkillBundle";
import "./Project.css";

const Project = () => {
  return (
    <div className="projectpage-container">
      <Article
        content={{
          img: "/portfolio/iamjaeeuncho.png",
          category: "Web",
          title: "Iamjaeeuncho",
          subtitle: "Personal Portfolio Blog",
          date: "2025. 03. 19 - 2025. 03. 25 (1 week, 1 person)",
          description: [
            "- Developed a static website using React.js.",
            "- Implemented responsive design and improved UI/UX.",
            "- Deployed the project using GitHub Pages.",
          ],
          url: "https://github.com/iamjaeeuncho/iamjaeeuncho.github.io",
        }}
      />
      <SkillBundle
        skills={[
          { name: "JavaScript", type: "language" },
          { name: "Html", type: "language" },
          { name: "Css", type: "language" },
          { name: "React.js", type: "framework" },
          { name: "GitHub Pages", type: "etc" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />

      <Article
        content={{
          img: "/portfolio/4CutStudio.png",
          category: "Web",
          title: "4CutStudio",
          subtitle: "Online Photobooth",
          date: "2024. 08. 19. - 2024. 09. 13 (4 weeks, 3 people)",
          description: [
            "- Database and Architecture Design.",
            "- Backend: Spring Boot Setup and Deployment on AWS EC2.",
            "- Frontend: Vue.js Setup and Deployment on AWS Amplify.",
            "- CRUD Implementation for Photo Upload and Management.",
            "- Image Storage and Management using AWS S3.",
          ],
          url: "https://github.com/iamjaeeuncho/ClickPic",
        }}
      />
      <SkillBundle
        skills={[
          { name: "Java", type: "language" },
          { name: "JavaScript", type: "language" },
          { name: "Html", type: "language" },
          { name: "Css", type: "language" },
          { name: "Spring Boot", type: "framework" },
          { name: "Vue.js", type: "framework" },
          { name: "MyBatis", type: "database" },
          { name: "Oracle", type: "database" },
          { name: "AWS", type: "etc" },
          { name: "Docker", type: "etc" },
          { name: "OpenVidu", type: "etc" },
          { name: "WebSocket", type: "etc" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />

      <Article
        content={{
          img: "/portfolio/OhMyStreetFood.png",
          category: "Web",
          title: "Oh My Street Food!",
          subtitle: "Street Food Restaurant Information Sharing Service",
          date: "2024. 06. 17. - 2024. 07. 12 (4 weeks, 5 people)",
          description: [
            "- Search Functionality: Developed store name search and popular search term tracking features.",
            "- Store List: Implemented distance display, sorting by latest/popular/nearest, and infinite scroll.",
            "- Payment: Integrated payment API and developed cart and order status pages.",
          ],
          url: "https://github.com/iamjaeeuncho/OhMyStreetFood",
        }}
      />
      <SkillBundle
        skills={[
          { name: "Java", type: "language" },
          { name: "JavaScript", type: "language" },
          { name: "Html", type: "language" },
          { name: "Css", type: "language" },
          { name: "Spring", type: "framework" },
          { name: "JSP", type: "library" },
          { name: "Bootstrap", type: "library" },
          { name: "jQuery", type: "library" },
          { name: "Ajax", type: "library" },
          { name: "MyBatis", type: "database" },
          { name: "Oracle", type: "database" },
          { name: "WebSocket", type: "etc" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />

      <Article
        content={{
          img: "/portfolio/DropTheBid.png",
          category: "Web",
          title: "Drop The Bid!",
          subtitle: "Used Goods Auction Service",
          date: "2024. 07. 22. - 2024. 08. 02 (2 weeks, 4 people)",
          description: [
            "- 1:1 Chat Service Implementation.",
          ],
          url: "https://github.com/iamjaeeuncho/DropTheBid",
        }}
      />
      <SkillBundle
        skills={[
          { name: "Java", type: "language" },
          { name: "JavaScript", type: "language" },
          { name: "Html", type: "language" },
          { name: "Css", type: "language" },
          { name: "Spring Boot", type: "framework" },
          { name: "Vue.js", type: "framework" },
          { name: "Vuetify", type: "library" },
          { name: "STOMP", type: "library" },
          { name: "MyBatis", type: "database" },
          { name: "Oracle", type: "database" },
          { name: "WebSocket", type: "etc" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />

      <Article
        content={{
          img: "/portfolio/Lottery.png",
          category: "Desktop App",
          title: "A Lottery Ticket in My Heart",
          subtitle: "Weighted Lottery Number Generator",
          date: "2024. 04. 30 - 2024. 05. 13 (2 weeks, 2 people)",
          description: [
            "- Automatic, Semi-Automatic, and Manual Lottery Number Generation.",
            "- Weighted Algorithm Applied for Automatic and Semi-Automatic Generation.",
          ],
          url: "https://github.com/iamjaeeuncho/LotteryProject",
        }}
      />
      <SkillBundle
        skills={[
          { name: "Java", type: "language" },
          { name: "Swing", type: "library" },
          { name: "Oracle", type: "database" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />

      <Article
        content={{
          img: "/portfolio/Devko.jpg",
          category: "Web",
          title: "Developers in Korea, Devko",
          subtitle: "Korean Developer Community",
          date: "2024. 01. 10 - 2024. 02. 07 (4 weeks, 3 people)",
          description: [
            "- Google Social Sign-up & Login.",
            "- Basic Board CRUD with Tags, Views, and Likes Functionality.",
            "- Blog Posting RSS Integration.",
          ],
          url: "https://github.com/iamjaeeuncho/DeveloperCommunityProject",
        }}
      />
      <SkillBundle
        skills={[
          { name: "JavaScript", type: "language" },
          { name: "Html", type: "language" },
          { name: "Node.js", type: "framework" },
          { name: "Express", type: "framework" },
          { name: "React.js", type: "library" },
          { name: "Tailwind Css", type: "library" },
          { name: "MySql", type: "database" },
          { name: "Git", type: "etc" },
        ]}
      />
      <div className="custom-divider" />
    </div>
  );
};

export default Project;
