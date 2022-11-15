import {React, useState, useEffect} from 'react';

function AddGame({onAddGame}) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [release_year, setReleaseYear] = useState("");
    const [image, setImage] = useState(""); // filename string ("image_2.png")
    const [imageFile, setImageFile] = useState(""); // file

    const [newGame, setNewGame] = useState({});

    useEffect(()=>{
        setNewGame({id, title, platform, release_year, image});
    }, [id, title, platform, release_year, image]);

    const handleFileSelect = (event) => {
        setImageFile(event.target.files[0]);
        setImage(event.target.files[0].name);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        await onAddGame(newGame, imageFile);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a game</h3>
            <div>
                <input type="text" id="add-game-id" placeholder="Enter the game id" onChange={(e)=>setId(e.target.value)}></input>
                <input type="text" id="add-game-title" placeholder="Enter the game title" onChange={(e)=>setTitle(e.target.value)}></input>
                <input type="text" id="add-game-platform" placeholder="Enter the game platform" onChange={(e)=>setPlatform(e.target.value)}></input>
                <input type="text" id="add-game-release-year" placeholder="Enter the game release year" onChange={(e)=>setReleaseYear(e.target.value)}></input>
                <input type="file" id="add-game-image" onChange={handleFileSelect}/>
            </div> 
            <input type="submit" id="add-game-btn" value="Submit" />
        </form>
    );
}

export default AddGame;