import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();   // current location

  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          </li>
          <li>
            <Link to="/project" className={location.pathname === "/project" ? "active" : ""}>Project</Link>
          </li>
          <li>
            <Link to="/essay" className={location.pathname === "/essay" ? "active" : ""}>Essay</Link>
          </li>
        </ul>
        <a className="language-btn" href="https://iamjaeeuncho.tistory.com">KOR</a>
      </nav>
    </header>
  );
};

export default Header;
