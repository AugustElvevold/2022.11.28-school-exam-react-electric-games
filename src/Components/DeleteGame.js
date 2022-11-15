import {React, useState} from 'react';
import axios from "axios";


function DeleteGame({onDeleteGame}) {
    const gameControllerUrl = "https://localhost:7420/api/Games"
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [release_year, setReleaseYear] = useState("");
    const [image, setImage] = useState("");

    const fetchGame = async (id)=>{
        await axios
        .get(`${gameControllerUrl}/${id}`)
        .then((response)=>{
            setTitle(response.data.title);
            setReleaseYear(response.data.release_year);
            setPlatform(response.data.platform);
            setImage(`https://localhost:7420/images/${response.data.image}`);
        })
        .catch(error=>console.log(error));
    }

    const confirmDeleteGame = ()=>{
        onDeleteGame(id);
    }

    return (
        <>
            <h3>Delete game</h3>
            <div>
                <input type="text" id="delete-game-id" placeholder="Enter the game id" onChange={(e)=>setId(e.target.value)}></input>
                <input type="button" id="fetch-data-btn" value="Fetch data" onClick={()=>fetchGame(id)}/>
                <p value={title} type="text" id="delete-game-title" placeholder="Game title"></p>
                <p value={release_year} type="text" id="delete-game-release-year" placeholder="Game release year"></p>
                <p value={platform} type="text" id="delete-game-platform" placeholder="Game platform"></p>
                <img className='img-preview' src={image} alt={image}/>
            </div> 
            <input type="button" id="delete-game-btn" value="Delete" onClick={confirmDeleteGame}/>
        </>
    );
}

export default DeleteGame;