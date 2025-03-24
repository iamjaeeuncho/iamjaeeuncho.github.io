import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="logos">
      <a href="https://github.com/iamjaeeuncho" target="_blank" rel="noopener noreferrer">
        <img className="logo" src="/logos/github.png" alt="GitHub Logo" />
      </a>
      <a href="https://www.linkedin.com/in/jaeeuncho" target="_blank" rel="noopener noreferrer">
        <img className="logo" src="/logos/linkedin.png" alt="Linkedin Logo" />
      </a>
      <a href="https://x.com/iamjaeeuncho" target="_blank" rel="noopener noreferrer">
        <img className="logo" src="/logos/twitter.png" alt="Twitter Logo" />
      </a>
    </div>
    <div className="copyright">
      © 2025 iamjaeeuncho. All rights reserved.
    </div>
  </footer>
);

export default Footer;
