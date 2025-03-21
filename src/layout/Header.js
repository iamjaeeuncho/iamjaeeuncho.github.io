import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();   // current location

  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>HOME</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>ABOUT</Link>
          </li>
          <li>
            <Link to="/project" className={location.pathname === "/project" ? "active" : ""}>PROJECT</Link>
          </li>
          <li>
            <Link to="/essay" className={location.pathname === "/essay" ? "active" : ""}>ESSAY</Link>
          </li>
        </ul>
        <a className="language-btn" href="https://iamjaeeuncho.tistory.com" target="_blank" rel="noopener noreferrer">KOR ↗</a>
      </nav>
    </header>
  );
};

export default Header;
