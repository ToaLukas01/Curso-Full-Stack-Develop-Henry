import React from 'react';
import Logo from '../logoHenry.png'
import SearchBar from './SearchBar.jsx';
import './Nav.css';

function Nav({onSearch}) {
  return (
    <div id='logoHenry'>
      <nav id='navegacion'>
        <img src={Logo}/>
        <h2 id='tituloNav'>Henry - Weather App</h2>
        <SearchBar onSearch={onSearch}/>
      </nav>
    </div>
  );
};

export default Nav;
