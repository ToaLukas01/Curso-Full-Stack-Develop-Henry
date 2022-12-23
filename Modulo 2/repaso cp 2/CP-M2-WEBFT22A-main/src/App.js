import React from 'react'
import './App.css';
import Nav from "./components/Nav/Nav";
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from"./components/Home/Home";
import AddTodo from "./components/AddTodo/AddTodo"

// En este componente deberias cargar tus rutas.
export function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/add" component={AddTodo}/>
    </div>
  );
}

export default App;
