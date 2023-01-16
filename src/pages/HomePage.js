import { React } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function GamesPage(props) {

  return (
    <>
      <Navbar></Navbar>
      <div className="homepage-container">
        <div className="homepage-container2">
          <div className="card-container">
            <Link to="/games" className="card homepage-card">
              <img src={require("../img/games-page.png")} alt="how to update or delete" />
              <div>
                <h5 className="homepage-card-title">Browse games</h5>
                <p className="homepage-card-body">Look at all the games in electric games database. Add your own games, update and delete anything.</p>
              </div>
            </Link>
          </div>
          <div className="card-container">
            <Link to="/characters" className="card homepage-card">
              <img src={require("../img/characters-page.png")} alt="how to update or delete" />
              <div>
                <h5 className="homepage-card-title">Browse Characters</h5>
                <p className="homepage-card-body">Look at all the characters in electric games database. Update your favorite or add your own!</p>
              </div>
            </Link>
          </div>
          <div className="card-container">
            <Link to="/hangman" className="card homepage-card">
              <img src={require("../img/hangman-page.png")} alt="how to update or delete" />
              <div>
                <h5 className="homepage-card-title">Play hangman!</h5>
                <p className="homepage-card-body">Guess the hidden game name before the man gets fully drawn!</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}

export default GamesPage;