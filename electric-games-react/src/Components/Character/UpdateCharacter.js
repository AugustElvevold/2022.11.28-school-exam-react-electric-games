import { React, useState, useEffect } from 'react';
import CardContent from '../CardContent';

function UpdateCharacter(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [image, setImage] = useState(""); // filename string ("image_2.png")
  const [imagePreview, setImagePreview] = useState(""); // preview image from wwwroot or currently uploaded
  const [imageFile, setImageFile] = useState(""); // file

  const [updatedCharacter, setUpdatedCharacter] = useState({});

  useEffect(() => {
    setId(props.currentCharacter.id)
    setName(props.currentCharacter.name)
    setGame(props.currentCharacter.game)
    setImage(props.currentCharacter.image)
    setImagePreview(`https://localhost:7420/images/${props.currentCharacter.image}`)
  }, [props.currentCharacter])

  // preview image that is currently uploaded
  useEffect(() => {
    if (!imageFile) return // escapes if there is no imagefile selected
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  useEffect(() => {
    setUpdatedCharacter({ id, name, game, image });
  }, [id, name, game, image]);

  const handleFileSelect = (event) => {
    setImageFile(event.target.files[0]);
    setImage("characters/" + event.target.files[0].name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setShowUpdateCharacterMenu(false);
    await props.onUpdateCharacter(updatedCharacter, imageFile);
  }

  const closeMenu = () => {
    props.setShowUpdateCharacterMenu(false);
    setImageFile("");
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-name'>Update character</h4>
        <div className='popup-menu-content'>
          <div>
            <label htmlFor="update-character-form">Change any or all of the input fields you want.</label>
            <br /><br />
            <form id='update-character-form' className='popup-menu-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor="update-character-name">Name</label>
                <input className='form-control' value={name} type="text" id="update-character-name" placeholder="Enter the character name" onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='form-group'>
                <label htmlFor="update-character-name">Game</label>
                <input className='form-control' value={game} type="text" id="update-character-release-year" placeholder="Enter the character game" onChange={(e) => setGame(e.target.value)}></input>
              </div>
              <div className='custom-file'>
                <label className="custom-file-label" htmlFor="vupdate-character-image">Choose image</label>
                <input type="file" id="update-character-image" className='custom-file-input' onChange={handleFileSelect} />
              </div>
            </form>
          </div>
          <div className='divider'></div>
          <div className="card-preview">
            <h4>Preview</h4>
            <div className='card'>
              <CardContent
                image={imagePreview}
                name={props.currentCharacter.name}
                game={props.currentCharacter.game}
                id={props.currentCharacter.id}
              ></CardContent>
            </div>
          </div>
        </div>
        <br />
        <div className='popup-menu-footer'>
          <input type="button" form='update-character-form' className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='update-character-form' className='btn btn-primary' value="Update" />
        </div>
      </div>
    </section>
  );
}

export default UpdateCharacter;