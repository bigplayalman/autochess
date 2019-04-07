import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export const Header = ({ left, right, toggleSidebar }) => {
  return (
    <header>
      <button className="hidden" onClick={() => { toggleSidebar('left', !left) }}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
      <strong>
        Dota Auto Chess Synergy
      </strong>
      <button className="hidden" onClick={() => { toggleSidebar('right', !right) }}>
        <FontAwesomeIcon icon={faEllipsisV} size="2x" />
      </button>
    </header>
  );
};

export default Header
