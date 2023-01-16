import { React, useEffect, useState } from "react";
import axios from "axios";
import Characters from '../Components/Character/Characters';
import Navbar from '../Components/Navbar';
import AddCharacters from '../Components/Character/AddCharacter';
import UpdateCharacter from '../Components/Character/UpdateCharacter';
import DeleteCharacter from '../Components/Character/DeleteCharacter';
import DisplayMessage from "../Components/DisplayMessage";

function CharactersPage(props) {
  const characterControllerUrl = "https://localhost:7420/api/characters";
  const [showAddCharacterMenu, setShowAddCharacterMenu] = useState(false);
  const [showUpdateCharacterMenu, setShowUpdateCharacterMenu] = useState(false);
  const [showDeleteCharacterMenu, setShowDeleteCharacterMenu] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState("");

  const [characters, setCharacters] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // Render characters on load and after every add, update, delete, and all searches
  useEffect(() => {
    axios.get(characterControllerUrl)
      .then(response => setCharacters(response.data))
      .catch(error => console.log(error))
  }, [updateFlag, showUpdateCharacterMenu]);

  const fetchCharacter = async (id) => {
    await axios
      .get(`${characterControllerUrl}/${id}`)
      .then((response) => {
        setCurrentCharacter(response.data);
      })
      .catch(error => console.log(error));
  }

  const addCharacter = async (newCharacter, newCharacterImageFile) => {
    console.log(JSON.stringify(newCharacter))
    await axios.post(characterControllerUrl,
      JSON.stringify(newCharacter),
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
    if (!newCharacterImageFile) return; // if no image is changed, function is escaped before trying to add image in database
    const formData = new FormData();
    formData.append("file", newCharacterImageFile);
    try {
      await axios({
        method: "post",
        url: `${characterControllerUrl}/UploadImage`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateCharacter = async (updatedCharacter, updatedCharacterImageFile) => {
    // Update character in mongoDB
    await axios.put(`${characterControllerUrl}/${updatedCharacter.id}`,
      JSON.stringify(updatedCharacter),
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
        setUpdateFlag(prev => !prev) // update page after update
      })
      .catch(error => console.log(error));

    // Adds new image to wwwroot
    if (!updatedCharacterImageFile) return; // if no image is changed, function is escaped before trying to add image in database
    const formData = new FormData();
    formData.append("file", updatedCharacterImageFile);
    try {
      await axios({
        method: "post",
        url: `${characterControllerUrl}/UploadImage`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCharacter = async (id) => {
    await axios.delete(`${characterControllerUrl}/${id}`)
      .then(() => { setUpdateFlag(prev => !prev) })
      .catch(error => console.log(error))
  }

  const searchCharacterByName = async (searchWord) => {
    if (searchWord) {
      await axios.get(`${characterControllerUrl}/search/${searchWord}`)
        .then(response => setCharacters(response.data))
        .catch(error => console.log(error))
      return
    }
    setUpdateFlag(prev => !prev); // shows all if user does a search with no searchword
  }

  return (
    <>
      <Navbar setShowAddCharacterMenu={setShowAddCharacterMenu} onSearchCharacter={searchCharacterByName}></Navbar>
      {/* If for some reason message is not there you can activate the line under and click it in the top right corner*/}
      {/* <p className="help-text" onClick={()=>{props.setUserInformed(false); }}>Where is update and delete??</p> */}
      <Characters fetchCharacter={fetchCharacter} characters={characters} setShowUpdateCharacterMenu={setShowUpdateCharacterMenu} setShowDeleteCharacterMenu={setShowDeleteCharacterMenu} setCurrentCharacter={setCurrentCharacter}></Characters>
      {showAddCharacterMenu && <AddCharacters setShowAddCharacterMenu={setShowAddCharacterMenu} addCharacter={addCharacter}></AddCharacters>}
      {showUpdateCharacterMenu && <UpdateCharacter setShowUpdateCharacterMenu={setShowUpdateCharacterMenu} currentCharacter={currentCharacter} onUpdateCharacter={updateCharacter}></UpdateCharacter>}
      {showDeleteCharacterMenu && <DeleteCharacter setShowDeleteCharacterMenu={setShowDeleteCharacterMenu} currentCharacter={currentCharacter} onDeleteCharacter={deleteCharacter}></DeleteCharacter>}
      {!props.userInformed && <DisplayMessage setUpdateFlag={setUpdateFlag} setUserInformed={props.setUserInformed}></DisplayMessage>}
    </>
  );
}

export default CharactersPage;