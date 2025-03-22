import React from "react";
import "./ListCompo.css";

const ListCompo = ({ content }) => {
  const { category, title, subtitle, date, description = [] } = content;

  return (
    <div className="list-container">
      <p className="list-category">{category}</p>
      <p className="list-title">{title}</p>
      <p className="list-subtitle">{subtitle}</p>
      <p className="list-date">{date}</p>
      <div className="list-description">
        {description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
      </div>
    </div>
  );
};

export default ListCompo;
