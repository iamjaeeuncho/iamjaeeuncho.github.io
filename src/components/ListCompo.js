import React from "react";
import "./ListCompo.css";

const ListCompo = ({ content }) => {
  const { category, title, subtitle, date, description = [], url } = content;

  return (
    <div className="list-container">
      <a className="list-url" href={url} target="_blank" rel="noopener noreferrer">
        <p className="list-category">{category}</p>
        <div className="list-title-container">
          <p className="list-title">{title}</p>
          <p className="list-url">→</p>
        </div>
        <p className="list-subtitle">{subtitle}</p>
        <p className="list-date">{date}</p>
        <div className="list-description">
          {description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>
      </a>
    </div>
  );
};

export default ListCompo;
