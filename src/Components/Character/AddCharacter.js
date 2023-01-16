import { React, useState, useEffect } from 'react';
import CardContent from '../CardContent';

function AddCharacter(props) {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [image, setImage] = useState("no-image.png"); // filename string ("image_2.png")
  const [imagePreview, setImagePreview] = useState(`https://localhost:7420/images/no-image.png`); // preview image currently uploaded
  const [imageFile, setImageFile] = useState(""); // file

  const [newCharacter, setNewCharacter] = useState({});

  useEffect(() => {
    setNewCharacter({ name, game, image });
  }, [name, game, image]);

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
    setImage("characters/" + event.target.files[0].name);
  }

  const resetAllFields = () => {
    setName("")
    setGame("")
    setImagePreview(`https://localhost:7420/images/no-image.png`)
    setImageFile("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setShowAddCharacterMenu(false);
    resetAllFields();
    await props.addCharacter(newCharacter, imageFile);
  }

  const closeMenu = () => {
    props.setShowAddCharacterMenu(false);
    resetAllFields();
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-name'>Add character</h4>
        <div className='popup-menu-content'>
          <div>
            <label htmlFor="add-character-form">Fill in all or any of the input fields.</label>
            <br /><br />
            <form id='add-character-form' className='popup-menu-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor="add-character-name">Name</label>
                <input className='form-control' value={name} type="text" id="add-character-name" placeholder="Enter the character name" onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="add-character-game">Game</label>
                <input className='form-control' value={game} type="text" id="add-character-game" placeholder="Enter the character game" onChange={(e) => setGame(e.target.value)}></input>
              </div>
              <div className='custom-file'>
                <label className="custom-file-label" htmlFor="add-character-image">Choose image</label>
                <input type="file" id="add-character-image" className='custom-file-input' onChange={handleFileSelect} />
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
                name={name}
                game={game}
                altenativeToId={"MongoDB will handle creating an ID"}
              ></CardContent>
            </div>
          </div>
        </div>
        <br />
        <div className='popup-menu-footer'>
          <input type="button" form='add-character-form' className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='add-character-form' className='btn btn-primary' value="Add" />
        </div>
      </div>
    </section>
  );
}

export default AddCharacter;