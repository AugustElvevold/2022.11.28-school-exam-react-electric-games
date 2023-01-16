import { React, useState, useEffect } from 'react';
import SearchGame from './Game/SearchGame';
import SearchCharacter from './Character/SearchCharacter';
import { NavLink } from "react-router-dom";


function Navbar(props) {
  const [navbarClass, setNavbarClass] = useState("");

  const openAddGameMenu = () => {
    props.setShowAddGameMenu(true);
  }

  const openAddCharacterMenu = () => {
    props.setShowAddCharacterMenu(true);
  }

  // Work around bootstrap media query by setting and removing a class based on width
  useEffect(() => {
    function handleResize() {
      (window.innerWidth > 1064) ? setNavbarClass("navbar-expand-lg") : setNavbarClass("");
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`navbar ${navbarClass}`}>
      <div className="container-fluid">
        <NavLink className={`nav-link navbar-brand ${({ isActive }) => (isActive && 'navbar-brand-active')}`} to="/">Electric games</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="bi bi-list bi-big"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={`nav-link ${({ isActive }) => (isActive && 'active')}`} to="/games">Games</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${({ isActive }) => (isActive && 'active')}`} to="/characters">Character</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${({ isActive }) => (isActive && 'active')}`} to="/hangman">Hangman</NavLink>
            </li>
            {props.onSearchGame &&
              <li className="nav-link add-new-card-link" onClick={openAddGameMenu}>
                <i className='bi bi-controller'></i>
                <p>Add game</p>
              </li>
            }
            {props.onSearchCharacter &&
              <li className="nav-link add-new-card-link" onClick={openAddCharacterMenu}>
                <i className='bi bi-person'></i>
                <p>Add Character</p>
              </li>
            }
          </ul>
          {props.onSearchGame && <SearchGame onSearchGame={props.onSearchGame} />}
          {props.onSearchCharacter && <SearchCharacter onSearchCharacter={props.onSearchCharacter} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar