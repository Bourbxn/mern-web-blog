import React from "react";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/create" className="nav-link">
            Articles
          </a>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <a href="/login" className="nav-link">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
