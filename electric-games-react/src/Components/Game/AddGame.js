import { React, useState, useEffect } from 'react';
import CardContent from '../CardContent';

function AddGame(props) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [release_year, setReleaseYear] = useState("");
  const [image, setImage] = useState("no-image.png"); // filename string ("image_2.png")
  const [imagePreview, setImagePreview] = useState(`https://localhost:7420/images/no-image.png`); // preview image currently uploaded
  const [imageFile, setImageFile] = useState(""); // file

  const [newGame, setNewGame] = useState({});

  useEffect(() => {
    setNewGame({ title, platform, release_year, image });
  }, [title, platform, release_year, image]);

  // preview image that is currently uploaded
  useEffect(() => {
    if (!imageFile) return // escapes if there is no imagefile selected
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const handleFileSelect = (event) => {
    setImageFile(event.target.files[0]);
    setImage("games/" + event.target.files[0].name);
  }

  const resetAllFields = () => {
    setTitle("")
    setPlatform("")
    setReleaseYear("")
    setImagePreview(`https://localhost:7420/images/no-image.png`)
    setImageFile("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setShowAddGameMenu(false);
    resetAllFields();
    await props.addGame(newGame, imageFile);
  }

  const closeMenu = () => {
    props.setShowAddGameMenu(false);
    resetAllFields();
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-title'>Add game</h4>
        <div className='popup-menu-content'>
          <div>
            <label htmlFor="add-game-form">Fill in all or any of the input fields.</label>
            <br /><br />
            <form id='add-game-form' className='popup-menu-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor="add-game-title">Game title</label>
                <input className='form-control' value={title} type="text" id="add-game-title" placeholder="Enter the game title" onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="add-game-release-year">Release year</label>
                <input className='form-control' value={release_year} type="text" id="add-game-release-year" placeholder="Enter the game release year" onChange={(e) => setReleaseYear(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="add-game-platform">Platform</label>
                <input className='form-control' value={platform} type="text" id="add-game-platform" placeholder="Enter the game platform" onChange={(e) => setPlatform(e.target.value)}></input>
              </div>
              <div className='custom-file'>
                <label className="custom-file-label" htmlFor="add-game-image">Choose image</label>
                <input type="file" id="add-game-image" className='custom-file-input' onChange={handleFileSelect} />
              </div>
            </form>
          </div>
          <div className='divider'></div>
          <div className="card-preview">
            <h4>Preview</h4>
            <div className='card'>
              <CardContent
                imageName={image}
                image={imagePreview}
                title={title}
                release_year={release_year}
                platform={platform}
                altenativeToId={"MongoDB will handle creating an ID"}
              ></CardContent>
            </div>
          </div>
        </div>
        <br />
        <div className='popup-menu-footer'>
          <input type="button" form='add-game-form' className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='add-game-form' className='btn btn-primary' value="Add" />
        </div>
      </div>
    </section>
  );
}

export default AddGame;