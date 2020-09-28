
 //TODO : USE NavLink
import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = (props) => {
  return (
    <div className="header">
      <NavLink to={"/cardsmanager"}>Cards Manager</NavLink>
      <NavLink to={"/flashcards"}>Flash Cards</NavLink>
    </div>
  );
}
export default Header;