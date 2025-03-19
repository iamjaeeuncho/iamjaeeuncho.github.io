import React from "react";
import VerticalTimeline from "../components/VerticalTimeline";

const events = [
  {
    title: "The origin",
    date: "May, 2020",
    description: "Acme was founded in Milan, Italy.",
  },
  {
    title: "The milestone",
    date: "May, 2021",
    description: "Reached 5K customers.",
  },
  {
    title: "The acquisitions",
    date: "May, 2022",
    description: "Acquired various companies, including Technology Inc.",
  },
  {
    title: "The IPO",
    date: "May, 2023",
    description: "Acme went public at the New York Stock Exchange.",
  },
];

const About = () => {
  return (
    <div>
      <h2>About Me</h2>
      <VerticalTimeline events={events} />
    </div>
  );
};

export default About;
