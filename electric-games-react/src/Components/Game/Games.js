import React from 'react';
import CardContent from '../CardContent';

function Games(props) {

  const handleUpdateCard = (e) => {
    props.setShowUpdateGameMenu(true);
    props.fetchGame(e);
  };

  const handleDeleteCard = (e) => {
    props.setShowDeleteGameMenu(true);
    props.fetchGame(e);
  };

  return (
    <article className='flex-center'>
      <div className='container-grid'>
        {props.games.map(game => {
          return (
            <div key={game.id}>
              <div className='card'>
                <div className='background-shadow'>
                  <button className='btn btn-overlay' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className='bi bi-three-dots bi-big'></i>
                  </button>
                  <ul className='dropdown-menu dropdown-menu-right'>
                    <li>
                      <button
                        data-game-id={game.id}
                        className='btn btn-update dropdown-item'
                        onClick={e => handleUpdateCard(e.currentTarget.dataset.gameId)}>
                        <i className='bi bi-pencil-square'></i>
                        <p>Update</p>
                      </button>
                    </li>
                    <li>
                      <button
                        data-game-id={game.id}
                        className='btn btn-delete dropdown-item'
                        onClick={e => handleDeleteCard(e.currentTarget.dataset.gameId)}>
                        <i className='bi bi-x-lg'></i>
                        <p>Delete</p>
                      </button>
                    </li>
                  </ul>
                </div>
                <CardContent
                  image={`https://localhost:7420/images/${game.image}`}
                  title={game.title}
                  release_year={game.release_year}
                  platform={game.platform}
                  id={game.id}
                ></CardContent>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  );
}

export default Games;