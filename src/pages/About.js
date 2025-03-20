import React from "react";
import VerticalTimeline from "../components/VerticalTimeline";

const About = () => {
  return (
    <div className="page-container">
      {/* <p className="menu-name">About</p> */}
        <p className="section-name">Introduce</p>
          <div className="section-description">
            <p>I always keep this line in my mind: 'Life is short and only happens once.' So, I would describe myself as a person who strives to do as many diverse things as possible, all the time.</p>
            <p>Accordingly, in my 20s, I challenged myself with as many things as I could, but sometimes I failed. However, those unintended failures sparked my curiosity in unfamiliar areas and helped me discover new possibilities. Becoming a programmer, after working as an NGO worker, a marketer, and a data analyst, was also a result of those failures.</p>
            <p>My style is to try and fail rather than regret not trying. However, this time is a bit different because, after experiencing programming over the past year, I've found it more enjoyable and have felt more alive than ever before.</p>
            <p>I hope this writing provides an answer to those who may wonder, 'Why has she kept changing careers?' I’ll conclude the piece here. 🤭 </p>
          </div>
        <p className="section-name">T.M.I.</p>
          <div className="section-description">
            <p>🗺️ I have traveled to 58 cities in 27 countries across Europe and Asia, and I am planning to travel to North and South America soon!</p>
            <p>📸 I used to grab my <a href="https://jenonearth.myportfolio.com/">camera</a> and head outside to take photos, but these days, I've taken a break after realizing the importance of privacy rights... sad...</p>
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
