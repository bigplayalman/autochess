import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

export const Sidebar = ({ show }) => {
  const navClasses = classnames({
    sidebar: true,
    show
  })
  console.log(navClasses);
  return (
    <nav className={navClasses}>
      <Link to="/">Chessboard</Link>
      <Link to="/list/">Synergy List</Link>
    </nav>
  );
};

export default Sidebar;
