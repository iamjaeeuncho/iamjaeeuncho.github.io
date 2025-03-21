import React from "react";
import "./Skill.css"

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