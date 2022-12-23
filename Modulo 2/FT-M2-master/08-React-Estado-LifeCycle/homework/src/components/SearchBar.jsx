import React, { useState } from "react";
import './Nav.css';

export default function SearchBar({onSearch}) {
const [city, setCity] = useState("")
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);
    }}>
      <input
        type="text"
        placeholder="Ciudad..."
        value={city}
        onChange={(e)=> setCity(e.target.value)}
      />
      <input id='busqueda' type="submit" value="Agregar"  />
    </form>
  );
}
