import React from 'react';

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
const CharacterCard = (prop) => {
    return (
        <div>
            <img src={prop.imageUrl}/>
            <p>ID: {prop.id}</p>
            <p>Name: {prop.fullname}</p>
            <p>Title: {prop.title}</p>
            <p>Family: {prop.family}</p>
        </div>
    );
};

export default CharacterCard;
