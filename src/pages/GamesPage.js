import { React, useEffect, useState } from "react";
import axios from "axios";
import Games from '../Components/Game/Games';
import Navbar from '../Components/Navbar';
import AddGames from '../Components/Game/AddGame';
import UpdateGame from '../Components/Game/UpdateGame';
import DeleteGame from '../Components/Game/DeleteGame';
import DisplayMessage from "../Components/DisplayMessage";

function GamesPage(props) {
  const gameControllerUrl = "https://localhost:7420/api/games";
  const [showAddGameMenu, setShowAddGameMenu] = useState(false);
  const [showUpdateGameMenu, setShowUpdateGameMenu] = useState(false);
  const [showDeleteGameMenu, setShowDeleteGameMenu] = useState(false);
  const [currentGame, setCurrentGame] = useState("");

  const [games, setGames] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // Render games on load and after every add, update, delete, and all searches
  useEffect(() => {
    axios.get(gameControllerUrl)
      .then(response => setGames(response.data))
      .catch(error => console.log(error))
  }, [updateFlag, showUpdateGameMenu]);

  const fetchGame = async (id) => {
    await axios
      .get(`${gameControllerUrl}/${id}`)
      .then((response) => {
        setCurrentGame(response.data);
      })
      .catch(error => console.log(error));
  }

  const addGame = async (newGame, newGameImageFile) => {
    await axios.post(gameControllerUrl,
      JSON.stringify(newGame),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        setUpdateFlag(prev => !prev) // update page after update
      })
      .catch(error => console.log(error));

    //post an image to wwwroot
    if (!newGameImageFile) return; // if no image is added, function is escaped before trying to add image in database
    const formData = new FormData();
    formData.append("file", newGameImageFile);
    try {
      await axios({
        method: "post",
        url: `${gameControllerUrl}/UploadImage`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateGame = async (updatedGame, updatedGameImageFile) => {
    // Update game in mongoDB
    await axios.put(`${gameControllerUrl}/${updatedGame.id}`,
      JSON.stringify(updatedGame),
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
        setUpdateFlag(prev => !prev) // update page after update
      })
      .catch(error => console.log(error));

    // Adds new image to wwwroot
    if (!updatedGameImageFile) return; // if no image is changed, function is escaped before trying to add image in database
    const formData = new FormData();
    formData.append("file", updatedGameImageFile);
    try {
      await axios({
        method: "post",
        url: `${gameControllerUrl}/UploadImage`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteGame = async (id) => {
    await axios.delete(`${gameControllerUrl}/${id}`)
      .then(() => { setUpdateFlag(prev => !prev) })
      .catch(error => console.log(error))
  }

  const searchGameByName = async (searchWord) => {
    if (searchWord) {
      await axios.get(`${gameControllerUrl}/search/${searchWord}`)
        .then(response => setGames(response.data))
        .catch(error => console.log(error))
      return
    }
    setUpdateFlag(prev => !prev); // shows all if user does a search with no searchword
  }

  return (
    <>
      <Navbar setShowAddGameMenu={setShowAddGameMenu} onSearchGame={searchGameByName}></Navbar>
      {/* If for some reason message is not there you can activate the line under and click it in the top right corner*/}
      {/* <p className="help-text" onClick={()=>{props.setUserInformed(false); }}>Where is update and delete??</p> */}
      <Games fetchGame={fetchGame} games={games} setShowUpdateGameMenu={setShowUpdateGameMenu} setShowDeleteGameMenu={setShowDeleteGameMenu} setCurrentGame={setCurrentGame}></Games>
      {showAddGameMenu && <AddGames setShowAddGameMenu={setShowAddGameMenu} addGame={addGame}></AddGames>}
      {showUpdateGameMenu && <UpdateGame setShowUpdateGameMenu={setShowUpdateGameMenu} currentGame={currentGame} onUpdateGame={updateGame}></UpdateGame>}
      {showDeleteGameMenu && <DeleteGame setShowDeleteGameMenu={setShowDeleteGameMenu} currentGame={currentGame} onDeleteGame={deleteGame}></DeleteGame>}
      {!props.userInformed && <DisplayMessage setUpdateFlag={setUpdateFlag} setUserInformed={props.setUserInformed}></DisplayMessage>}
    </>
  );
}

export default GamesPage;