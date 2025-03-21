import React from "react";
import "./Article.css";

const Article = ({ content }) => {
  const { category, title, subtitle, date, description = [] } = content; // default

  return (
    <div className="article-container">
      <p className="article-category">{category}</p>
      <p className="article-title">{title}</p>
      <p className="article-subtitle">{subtitle}</p>
      <p className="article-date">{date}</p>
      <div className="article-description">
        {description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
      </div>
    </div>
  );
};

export default Article;
