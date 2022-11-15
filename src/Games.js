import React from 'react';

function Games({games}) {

    return (
        <div className='container'>
            <div className='row'>
                {games.map(game=>{
                    return(
                        <article key={game.id} className='col-sm'>
                            <div className='card'>
                                <img src={`https://localhost:7420/images/${(game.image)}`} alt={game.image}/>
                                <h5>{game.title}</h5>
                                <p>Release year: {game.release_year}</p>
                                <p>Platform: {game.platform}</p>
                                <p className='display-id'>Id: {game.id}</p>
                                <div>
                                    <button>Update</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Games;