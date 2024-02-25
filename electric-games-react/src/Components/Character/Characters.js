import React from 'react';
import CardContent from '../CardContent';

function Character(props) {

  const handleUpdateCard = (e) => {
    props.setShowUpdateCharacterMenu(true);
    props.fetchCharacter(e);
  };

  const handleDeleteCard = (e) => {
    props.setShowDeleteCharacterMenu(true);
    props.fetchCharacter(e);
  };

  return (
    <article className='flex-center'>
      <div className='container-grid'>
        {props.characters.map(character => {
          return (
            <div key={character.id}>
              <div className='card'>
                <div className='background-shadow'>
                  <button className='btn btn-overlay' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className='bi bi-three-dots bi-big'></i>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-right'>
                    <li>
                      <button
                        data-character-id={character.id}
                        className='btn btn-update dropdown-item'
                        onClick={e => handleUpdateCard(e.currentTarget.dataset.characterId)}>
                        <i className='bi bi-pencil-square'></i>
                        <p>Update</p>
                      </button>
                    </li>
                    <li>
                      <button
                        data-character-id={character.id}
                        className='btn btn-delete dropdown-item'
                        onClick={e => handleDeleteCard(e.currentTarget.dataset.characterId)}>
                        <i className='bi bi-x-lg'></i>
                        <p>Delete</p>
                      </button>
                    </li>
                  </ul>
                </div>
                <CardContent
                  image={`https://localhost:7420/images/${character.image}`}
                  name={character.name}
                  game={character.game}
                  id={character.id}
                ></CardContent>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  );
}

export default Character;