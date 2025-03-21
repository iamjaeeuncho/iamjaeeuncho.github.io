import React from "react";
import './Home.css';

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="left-side">
        <img className="profile-img" src="/emoji.png" alt="emoji" />
      </div>
      <div className="right-side">
          <div className="home-title">Jaeeun, Cho</div>
          <div className="home-description">
            <p>I'm a web developer with a focus on Java and JavaScript, but still exploring other technologies and frameworks that catch my interest!</p>
            <p>If you're looking for a developer to add to your team, I'd love to hear from you!</p>
          </div>
        <div className="btns">
            <a href="/resume.pdf" download>
              <button className="resume-btn">RESUME</button>
            </a>
            <a href="mailto:redjoun@gmail.com">
              <button className="contact-btn">CONTACT</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
