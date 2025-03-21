import React from "react";
import "./SkillList.css"

const SkillItem = ({ name, type }) => {
  return <li className={`skill-name ${type}`}>{name}</li>;
};

const SkillList = ({ skills }) => {
  return (
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <SkillItem key={index} name={skill.name} type={skill.type} />
      ))}
    </ul>
  );
};

export default SkillList;


// import SkillList from "../components/SkillList";

// <SkillList skills={skills} />

// const skills = [
//   { name: "Java", type: "language" },
//   { name: "JavaScript", type: "language" },
//   { name: "Html", type: "language" },
//   { name: "Css", type: "language" },
//   { name: "Python", type: "language" },
//   { name: "Spring", type: "framework" },
//   { name: "Spring Boot", type: "framework" },
//   { name: "Node.js", type: "framework" },
//   { name: "Vue.js", type: "framework" },
//   { name: "React.js", type: "framework" },
//   { name: "MySQL", type: "database" },
//   { name: "Oracle", type: "database" },
//   { name: "SQLite", type: "database" },
//   { name: "MyBatis", type: "database" },
//   { name: "JPA", type: "database" },
//   { name: "Git", type: "etc" },
//   { name: "AWS", type: "etc" },
// ];