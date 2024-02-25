import { React } from 'react';
import CardContent from '../CardContent';

function DeleteGame(props) {

  const confirmDeleteGame = () => {
    props.setShowDeleteGameMenu(false);
    props.onDeleteGame(props.currentGame.id);
  }

  const closeMenu = () => {
    props.setShowDeleteGameMenu(false);
  }

  return (
    <section className='popup-section'>
      <div className='animate-heigt'></div>
      <div className="popup-menu">
        <button className='btn-close-menu' onClick={closeMenu}><i className='bi bi-x-lg'></i></button>
        <h4 className='popup-menu-title'>Delete game</h4>
        <label htmlFor='delete-game-form'>Are you sure you want to delete "{props.currentGame.title}"</label>
        <form id='delete-game-form' onSubmit={confirmDeleteGame} className='popup-menu-content'>
          <div className="flex-center">
            <div className="card-preview">
              <div className='card'>
                <CardContent
                  image={`https://localhost:7420/images/${props.currentGame.image}`}
                  title={props.currentGame.title}
                  release_year={props.currentGame.release_year}
                  platform={props.currentGame.platform}
                  id={props.currentGame.id}
                ></CardContent>
              </div>
            </div>
          </div>
        </form>
        <div className='popup-menu-footer'>
          <input type="button" className='btn btn-secondary' value="Cancel" onClick={closeMenu} />
          <input type="submit" form='delete-game-form' className='btn btn-danger' value="Delete" />
        </div>
      </div>
    </section>
  );
}

export default DeleteGame;