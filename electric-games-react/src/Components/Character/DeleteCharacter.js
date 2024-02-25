import { React } from 'react';
import CardContent from '../CardContent';

function DeleteCharacter(props) {

  const confirmDeleteCharacter = () => {
    props.setShowDeleteCharacterMenu(false);
    props.onDeleteCharacter(props.currentCharacter.id);
  }

  const closeMenu = () => {
    props.setShowDeleteCharacterMenu(false);
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-title'>Delete character</h4>
        <label htmlFor='delete-character-form'>Are you sure you want to delete "{props.currentCharacter.title}"</label>
        <form id='delete-character-form' onSubmit={confirmDeleteCharacter} className='popup-menu-content'>
          <div className="flex-center">
            <div className="card-preview">
              <div className='card'>
                <CardContent
                  image={`https://localhost:7420/images/${props.currentCharacter.image}`}
                  name={props.currentCharacter.name}
                  character={props.currentCharacter.character}
                  id={props.currentCharacter.id}
                ></CardContent>
              </div>
            </div>
          </div>
        </form>
        <div className='popup-menu-footer'>
          <input type="button" className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='delete-character-form' className='btn btn-danger' value="Delete" />
        </div>
      </div>
    </section>
  );
}

export default DeleteCharacter;