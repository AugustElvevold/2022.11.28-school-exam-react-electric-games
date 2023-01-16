import { React, useState, useEffect } from 'react';
import CardContent from '../CardContent';

function UpdateGame(props) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [release_year, setReleaseYear] = useState("");
  const [image, setImage] = useState(""); // filename string ("image_2.png")
  const [imagePreview, setImagePreview] = useState(""); // preview image from wwwroot or currently uploaded
  const [imageFile, setImageFile] = useState(""); // file

  const [updatedGame, setUpdatedGame] = useState({});

  useEffect(() => {
    setId(props.currentGame.id)
    setTitle(props.currentGame.title)
    setPlatform(props.currentGame.platform)
    setReleaseYear(props.currentGame.release_year)
    setImage(props.currentGame.image)
    setImagePreview(`https://localhost:7420/images/${props.currentGame.image}`)
  }, [props.currentGame])

  // preview image that is currently uploaded
  useEffect(() => {
    if (!imageFile) return // escapes if there is no imagefile selected
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  useEffect(() => {
    setUpdatedGame({ id, title, platform, release_year, image });
  }, [id, title, platform, release_year, image]);

  const handleFileSelect = (event) => {
    setImageFile(event.target.files[0]);
    setImage("games/" + event.target.files[0].name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setShowUpdateGameMenu(false);
    await props.onUpdateGame(updatedGame, imageFile);
  }

  const closeMenu = () => {
    props.setShowUpdateGameMenu(false);
    setImageFile("");
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-title'>Update game</h4>
        <div className='popup-menu-content'>
          <div>
            <label htmlFor="update-game-form">Change any or all of the input fields you want.</label>
            <br /><br />
            <form id='update-game-form' className='popup-menu-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor="update-game-title">Game title</label>
                <input className='form-control' value={title} type="text" id="update-game-title" placeholder="Enter the game title" onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="update-game-title">Release year</label>
                <input className='form-control' value={release_year} type="text" id="update-game-release-year" placeholder="Enter the game release year" onChange={(e) => setReleaseYear(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="update-game-title">Platform</label>
                <input className='form-control' value={platform} type="text" id="update-game-platform" placeholder="Enter the game platform" onChange={(e) => setPlatform(e.target.value)}></input>
              </div>
              <div className='custom-file'>
                <label className="custom-file-label" htmlFor="vupdate-game-image">Choose image</label>
                <input type="file" id="update-game-image" className='custom-file-input' onChange={handleFileSelect} />
              </div>
            </form>
          </div>
          <div className='divider'></div>
          <div className="card-preview">
            <h4>Preview</h4>
            <div className='card'>
              <CardContent
                image={imagePreview}
                title={props.currentGame.title}
                release_year={props.currentGame.release_year}
                platform={props.currentGame.platform}
                id={props.currentGame.id}
              ></CardContent>
            </div>
          </div>
        </div>
        <br />
        <div className='popup-menu-footer'>
          <input type="button" form='update-game-form' className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='update-game-form' className='btn btn-primary' value="Update" />
        </div>
      </div>
    </section>
  );
}

export default UpdateGame;