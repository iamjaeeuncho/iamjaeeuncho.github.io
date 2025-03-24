import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav>
        <div className="hamburger-icon" onClick={toggleMenu} ref={hamburgerRef}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul ref={menuRef} className={`menu ${isMenuOpen ? 'open' : ''}`}>
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
