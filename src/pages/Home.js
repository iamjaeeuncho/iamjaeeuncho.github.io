import React from "react";

const Home = () => {
  return (
    <div className="page-container">
      {/* <p className="menu-name">Home</p> */}
      <center>
        <img src="/emoji.png" alt="emoji" />
        <p>Software Developer</p>
        <p>
          I'm a web developer with a focus on Java and JavaScript, but still exploring other technologies and frameworks that catch my interest!
        </p>
        <p>if you're looking for a developer to add to your team, I'd love to hear from you!</p>

        <a href="/path-to-your-resume.pdf" download>
          <button className="btn">Resume</button>
        </a>

        <a href="mailto:redjoun@gmail.com">
          <button className="btn">Contact</button>
        </a>
      </center>
    </div>
  );
};

export default Home;
