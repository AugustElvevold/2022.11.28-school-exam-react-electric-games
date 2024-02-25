import React from 'react';

function CardContent(props) {
  return (
    <>
      <img src={props.image} alt={props.imageName ? props.imageName : props.image} />
      <div className="card-info">
        {props.title && <h5>{props.title}</h5>}
        {props.name && <h5>{props.name}</h5>}
        {props.release_year && <p>Release year: {props.release_year}</p>}
        {props.platform && <p>Platform: {props.platform}</p>}
        {props.game && <p>Game: {props.game}</p>}
      </div>
      <p className='display-id'>Id: {props.id ? props.id : props.altenativeToId}</p>
    </>
  );
}

export default CardContent;