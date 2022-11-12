import React from 'react';

function Games({games}) {

    return (
        <div className='container'>
            <div className='row'>
                {games.map(game=>{
                    return(
                        <article key={game.id} className='card col-lg'>
                            <img className='img img-responsive full-width' src={`https://localhost:7420/images/${(game.image)}`} alt={game.image}/>
                            <h3>{game.title}</h3>
                            <p>Release year: {game.release_year}</p>
                            <p>Platform: {game.platform}</p>
                            <p className='display-id'>Id: {game.id}</p>
                            <div>
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Games;