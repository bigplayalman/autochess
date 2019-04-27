import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

export const Sidebar = ({ show }) => {
  const navClasses = classnames({
    sidebar: true,
    show
  });

  return (
    <nav className={navClasses}>
      <Link to="/">Chessboard</Link>
      <Link to="/list/">Synergy List</Link>
      <a href="https://discord.gg/7wqYw5h" target="_blank" rel="noopener noreferrer">Discord</a>
    </nav>
  );
};

export default Sidebar;
