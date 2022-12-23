// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import imagen from "../../img-cp2/main-image-cp2.jpg"
// import { getAllHouses } from '../../redux/actions';
// import HouseCard from "../HouseCard/HouseCard.jsx";

// // CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// // TAMBIEN VAS A TENER QUE USAR EL METODO CONNECT DE REDUX, JUNTO A MAP_STATE_TO_PROPS 
// // Y MAP_DISPATCH_TO_PROPS!! <3
// export class Houses extends Component {
//     constructor(props){
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <h1>Game of Thrones</h1>
//                 <img src={imagen} alt="main-img"/>
//                 <h3>Houses</h3>
//                 { this.props.houses && this.props.houses.map((house) => (
//                     <HouseCard
//                         key={house.id}
//                         id={house.id}
//                         region={house.region}
//                         name={house.name}
//                         words={house.words}
//                         characters={house.characters}
//                     />
//                 ))}
//             </div>
//         );
//     };
// };
//                              //function(state){}
// export const mapStateToProps = (state) =>{
//     return {houses: state.houses}
// };

// export const mapDispatchToProps = (dispatch) => {
//     return {getAllHouses: ()=> dispatch(getAllHouses())}
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Houses);

import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../../img-cp2/main-image-cp2.jpg";
import HouseCard from "../HouseCard/HouseCard.jsx";
import { getAllHouses } from "../../redux/actions/index.js";

// CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR EL METODO CONNECT DE REDUX, JUNTO A MAP_STATE_TO_PROPS
// Y MAP_DISPATCH_TO_PROPS!! <3
export class Houses extends Component {
  componentDidMount() {
    this.props.getAllHouses();
  }

  render() {
    return (
      <div>
        <h1>Game of Thrones</h1>
        <img src={image} alt="main-img" />
        <h3>Houses</h3>
        {this.props.houses && this.props.houses.map((house) => (
          <HouseCard
            key={house.id}
            id={house.id}
            region={house.region}
            name={house.name}
            words={house.words}
            characters={house.characters}
          />
        ))}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    houses: state.houses,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllHouses: () => dispatch(getAllHouses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);