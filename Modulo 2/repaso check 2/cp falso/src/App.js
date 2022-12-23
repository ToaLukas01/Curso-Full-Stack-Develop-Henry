// import { Route } from 'react-router-dom';
// import Nav from './components/Nav/Nav';
// import Houses from "./components/Houses/Houses";
// import HouseDetail from './components/HouseDetail/HouseDetail';
// import CreateHouse from "./components/CreateHouse/CreateHouse"

// //aqui vna a ir todos los componentes y donde vamos a hacer las rutas
// function App() { 
//   return (
//     <div className="App">
//       <Route path="/" component={Nav} />
//       <Route exact path="/" component={Houses} />
//       <Route exact path="/houses/:housesId" component={HouseDetail} />
//       <Route exact path="/houses/create" component={CreateHouse} />
//     </div>
//   );
// };

// export default App;

import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Houses from "./components/Houses/Houses"
import HouseDetail from './components/HouseDetail/HouseDetail';
import CreateHouse from './components/CreateHouse/CreateHouse';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav}/>
      <Route exact path="/" component={Houses}/>
      <Route path="/houses/:houseId" component={HouseDetail}/>
      <Route exact path="/house/create" component={CreateHouse}/>
    </div>
  );
};
export default App;
