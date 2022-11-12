import {React, useState, useEffect} from 'react';
import axios from "axios";


function UpdateGame({onUpdateGame}) {
    const gameControllerUrl = "https://localhost:7420/api/Games"
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [release_year, setReleaseYear] = useState("");
    const [image, setImage] = useState(""); // filename string ("image_2.png")
    const [imageFile, setImageFile] = useState(""); // file

    const [updatedGame, setUpdatedGame] = useState({});

    const [imgPreview, setImgPreview] = useState("https://localhost:7420/images/no-image.png");

    useEffect(() => {
        if (!imageFile) {
            return
        }

        const objectUrl = URL.createObjectURL(imageFile)
        setImgPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [imageFile])

    useEffect(()=>{
        setUpdatedGame({id, title, platform, release_year, image});
    }, [id, title, platform, release_year, image]);

    const fetchGame = async (id)=>{
        await axios
        .get(`${gameControllerUrl}/${id}`)
        .then((response)=>{
            setTitle(response.data.title);
            setReleaseYear(response.data.release_year);
            setPlatform(response.data.platform);
            setImage(response.data.image);
            setImgPreview(`https://localhost:7420/images/${response.data.image}`)
        })
        .catch(error=>console.log(error));
    }

    const handleFileSelect = (event) => {
        setImageFile(event.target.files[0]);
        setImage(event.target.files[0].name);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        await onUpdateGame(updatedGame, imageFile);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update game</h3>
            <div>
                <input type="text" id="add-game-id" placeholder="Enter the game id" onChange={(e)=>setId(e.target.value)}></input>
                <input type="button" id="fetch-data-btn" value="Fetch data" onClick={()=>fetchGame(id)}/>
                <input value={title} type="text" id="add-game-title" placeholder="Enter the game title" onChange={(e)=>setTitle(e.target.value)}></input>
                <input value={release_year} type="text" id="add-game-release-year" placeholder="Enter the game release year" onChange={(e)=>setReleaseYear(e.target.value)}></input>
                <input value={platform} type="text" id="add-game-platform" placeholder="Enter the game platform" onChange={(e)=>setPlatform(e.target.value)}></input>
                <img className='img-preview' src={imgPreview} alt={image}/>
                <input type="file" id="add-game-image" onChange={handleFileSelect}/>
            </div> 
            <input type="submit" id="add-game-btn" value="Update" />
        </form>
    );
}

export default UpdateGame;