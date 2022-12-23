// import React from 'react';
// import { getHouse } from '../../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import CharacterCard from '../CharacterCard/CharacterCard';

// // CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// // TAMBIEN VAS A TENER QUE USAR HOOKS!
// const HouseDetail = ({id}) => {

//     const dispatch = useDispatch();
//     const house = useSelector((state)=>{state.house})
//     React.useEffect(()=>{
//         dispatch(getHouse(id))
//     }, [dispatch, id])
    
//     return (
//         <div>
//            {house.characters && house.characters.map((casa)=>{
//                <CharacterCard
//                fullName={casa.fullname}
//                key={casa.id}
//                id={casa.id}
//                family={casa.family}
//                imageUrl={casa.imageUrl}
//                />
//            })} 
//         </div>
//     );
// };

// export default HouseDetail;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHouse } from "../../redux/actions/index.js";
import CharacterCard from "../CharacterCard/CharacterCard.jsx";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
const HouseDetail = ({ id }) => {
  const dispatch = useDispatch();

  const house = useSelector((state) => state.house);

  React.useEffect(() => {
    dispatch(getHouse(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>{house.name}</div>
      <div>{house.words}</div>
      <div>
        {house.characters?.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            fullName={character.fullName}
            title={character.title}
            family={character.family}
            imageUrl={character.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseDetail
