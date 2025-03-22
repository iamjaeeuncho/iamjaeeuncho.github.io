import React from "react";
import VerticalTimeline from "../components/VerticalTimeline";
import "./About.css";

const About = () => {
  return (
    <div className="aboutpage-container">
        <p className="section-name">Introduce</p>
          <div className="section-description">
            <p>I always keep this line in my mind: 'Life is short and only happens once.' This mindset drives me to explore a wide range of opportunities and experiences.</p>
            <p>In my 20s, I threw myself into various fields, challenging myself to try new things. Some of those attempts resulted in failure, but rather than discouraging me, they sparked my curiosity in unfamiliar areas and helped me uncover new possibilities. Transitioning into programming, after working as an NGO worker, a marketer, and a data analyst, is a testament to how these diverse experiences shaped my career path.</p>
            <p>Over the past year, I’ve found programming to be an incredibly enjoyable and fulfilling pursuit, making me feel more alive than ever before. I am continually learning new technologies and approaches, which excites me about the endless opportunities for growth and contribution in the tech industry.</p>
            <p>I look forward to using my diverse background and passion for problem-solving to create meaningful, innovative solutions as I continue to develop my skills as a programmer.</p>
          </div>
        <p className="section-name">T.M.I.</p>
          <div className="section-description">
            <p>🗺️ I have traveled to 58 cities in 27 countries across Europe and Asia, and I am planning to travel to North and South America soon!</p>
            <p>📸 I used to grab my <a href="https://jenonearth.myportfolio.com/">camera</a> and head outside to take photos, but these days, I've taken a break after understanding the risks of privacy rights.</p>
            <p>🎤 In my teens, I majored in music and attended an art high school, where I was the vocalist in one of the bands.</p>
            <p>🍻 I'm serious about food... Nom nom...</p>
          </div>
        <p className="section-name">Experience</p>
          <div className="section-description">
            <VerticalTimeline events={events} />
          </div>
    </div>
  );
};

const events = [
  {
    title: "Student",
    date: "Oct. 2023 - Sep. 2024",
    description: "2 Software Boot Camps (Seoul, Korea)",
  },
  {
    title: "Business Analyst",
    date: "Nov. 2021 - Jul. 2022",
    description: "Fassto (Seoul, Korea)",
  },
  {
    title: "Marketing freelancer",
    date: "Nov. 2020 - Oct. 2021",
    description: "Gyeonggi-do Village Community Support Center and so on. (Seoul, Korea)",
  },
  {
    title: "Data Analyst",
    date: "Jan. 2020 - Oct. 2020",
    description: "Lab543 at Jiwoo Company (Seoul, Korea)",
  },
  {
    title: "Self-employed",
    date: "Apr. 2018 - Dec. 2019",
    description: "Cross-border seller on Naver and E-bay. (Seoul, Korea)",
  },
  {
    title: "E-commerce Marketing Assistant",
    date: "May. 2016 - Jan. 2018",
    description: "Dorco Europe ltd. (London, United Kingdom)",
  },
  {
    title: "Young Professional Intern",
    date: "May. 2015 - Nov. 2015",
    description: "KOICA (Yangon, Myanmar)",
  },
  {
    title: "Bachelor of Economics",
    date: "Mar. 2009 - Feb. 2015",
    description: "Kookmin University (Seoul, Korea)",
  },
];

export default About;
