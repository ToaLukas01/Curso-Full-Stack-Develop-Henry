// import React from 'react';
// import { connect } from 'react-redux';
// import { addTodo } from "../../actions";

// // Nota 1: Para utilizar el hook `useState` para el manejo de estados de los inputs, tendras que utilizarlo de la siguiente manera
// //React.useState

// // Nota 2: En este componente tendras que usar la funcion `connect` de react-redux para conectarte al store. 
// // Si usas el hook `useDispatch` no funcionaran los test.

// export function AddTodo(addTodo) {
//   const [formulario, setFormulario] = React.useState({
//     title:"",
//     description:"",
//     place:"",
//     date:"",
//   });

//   const handleInputChange =(evento)=>{
//     setFormulario({
//       ...formulario,
//       [evento.target.name]: evento.target.value,
//     });   
//   };

//   const handleSunmit = (evento)=>{
//     evento.preventDefault();
//     addTodo(formulario);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSunmit}>
//         <label>Title</label>
//         <input name="title" value={formulario.title} onChange={(e)=>handleInputChange(e)}/>
//         <label>Description</label>
//         <textarea name="description" value={formulario.description} onChange={(e)=>handleInputChange(e)} />
//         <label>Place</label>
//         <input name="place" value={formulario.place} onChange={(e)=>handleInputChange(e)} />
//         <label>Date</label>
//         <input name="date" value={formulario.date} onChange={(e)=>handleInputChange(e)} />
//         <button type="submit" ></button>
//       </form>
//     </div>
//   )
// };

// // const  mapDispatchToProps = {
// //   addTodo,
// // };

// export default connect(null, { addTodo })(AddTodo); 

import React from 'react';
import { connect } from 'react-redux'
import { addTodo } from '../../actions';

// Nota 1: Para utilizar el hook `useState` para el manejo de estados de los inputs, tendras que utilizarlo de la siguiente manera
//React.useState

// Nota 2: En este componente tendras que usar la funcion `connect` de react-redux para conectarte al store. 
// Si usas el hook `useDispatch` no funcionaran los test.

export function AddTodo(props) {

  const [input, setInput] = React.useState({
    title: '',
    description: '',
    place: '',
    date: ''
  })

  function handleChange(event) {
    setInput({
        ...input,
        [event.target.name] : event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addTodo(input)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Title</label>
        <br />
        <input name="title" onChange={(e) => handleChange(e)} value={input.title}></input>
        <br />
        <label>Description</label>
        <br />
        <textarea name="description" onChange={(e) => handleChange(e)} value={input.description}></textarea>
        <br />
        <label>Place</label>
        <br />
        <input name="place" onChange={(e) => handleChange(e)} value={input.place}></input>
        <br />
        <label>Date</label>
        <br />
        <input name="date" onChange={(e) => handleChange(e)} value={input.date}></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default connect(null, { addTodo })(AddTodo)