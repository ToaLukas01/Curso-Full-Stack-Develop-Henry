import React from 'react';
//import Cards from './Cards'

export default function SearchBar(props) {
  // acá va tu código
  return (<div>
    <input type="text" placeholder="ciudad"/>
    <button onClick = {() => props.onSearch(" ")} >Buscar</button>
  </div>)
};