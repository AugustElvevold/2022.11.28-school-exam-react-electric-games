import {React, useEffect, useState} from "react";
import axios from "axios";
import Games from './Games';
import UpdateGame from './Components/UpdateGame';
import AddGames from './Components/AddGame';
// import {AddGames, UpdateGame} from './api_requests';

function App() {
    const [games, setGames] = useState([]);
    const [newGameFlag, setNewGameFlag] = useState(false);
    const [updatedGameFlag, setUpdatedGameFlag] = useState(false);
    const gameControllerUrl = "https://localhost:7420/api/Games"

    useEffect(()=>{
        axios.get(gameControllerUrl)
        .then(response=>setGames(response.data))
        .catch(error=>console.log(error))
    },[newGameFlag, updatedGameFlag]);

    const addGame = async (newGame, newGameImageFile) => {
        await axios.post(gameControllerUrl,
            JSON.stringify(newGame),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            .then(()=>{
                setNewGameFlag(prev=>!prev)
            })
            .catch(error=>console.log(error));
            
        //post an image
        const formData = new FormData();
        formData.append("file", newGameImageFile);
        try{
            await axios({
                 method: "post",
                 url: `${gameControllerUrl}/UploadImage`,
                 data: formData,
                 headers:{
                    "Content-Type": "multipart/form-data"
                 }
            })
        } catch(error) {
            console.log(error)
        }
    }

    const updateGame = async (updatedGame, updatedGameImageFile)=>{
        // Put updated game in mongo db
        await axios.put(`${gameControllerUrl}/${updatedGame.id}`, 
        JSON.stringify(updatedGame), 
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then(()=>{
            setUpdatedGameFlag(prev=>!prev) // update page after update
        })
        .catch(error=>console.log(error));

        //update an image in api
        const formData = new FormData();
        formData.append("file", updatedGameImageFile);
        try{
            await axios({
                 method: "post",
                 url: `${gameControllerUrl}/UploadImage`,
                 data: formData,
                 headers:{
                    "Content-Type": "multipart/form-data"
                 }
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
            
            <AddGames onAddGame = {addGame}></AddGames>
            <UpdateGame onUpdateGame={updateGame}></UpdateGame>
            <Games games={games}></Games>
        </>
    );
}

export default App;