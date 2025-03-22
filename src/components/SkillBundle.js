import React from "react";
import "./SkillBundle.css"

const Skill = ({ name, type }) => {
  return <li className={`skill-name ${type}`}>{name}</li>;
};

const SkillBundle = ({ skills }) => {
  return (
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <Skill key={index} name={skill.name} type={skill.type} />
      ))}
    </ul>
  );
};

export default SkillBundle;