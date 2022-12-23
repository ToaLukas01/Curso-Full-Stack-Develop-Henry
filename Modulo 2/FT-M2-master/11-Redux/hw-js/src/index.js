const { createStore } = require('redux');
const contador = require('./reducer');
const { incremento, decremento, incrementoAsync, incrementoImpar } = require('./actions');

// En esta linea creamos nuestro store. Pasandole como parametro nuestro Reducer
var store = createStore(contador);

// Obtenemos el elemento con el id `valor`.
var valor = document.querySelector('#valor');

// Esta funcion nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador() {
  // Obtenemos la propiedad 'contador' de nuestro store:
  var numero = store.getState().contador;
  // Seteamos el numero obtenido como texto dentro del elemento con id 'valor':
  valor.innerHTML = numero;
}

// Ejecutamos la funcion 'renderContador':
renderContador();


// Nos subscribimos al store pasandole la misma funcion. Asi cada vez que llegue una accion, ejecutamos la funcion:
store.subscribe(renderContador);


// Por ultimo, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la accion correspondiente:
let boton_inc = document.getElementById('incremento');
boton_inc.onclick = ()=> store.dispatch(incremento());

let boton_dec = document.getElementById('decremento');
boton_dec.onclick = () => store.dispatch(decremento());

let boton_Async = document.getElementById('incrementoAsync')
boton_Async.onclick = () => setTimeout(() => store.dispatch(incrementoAsync()), 1000)

let boton_Impar = document.getElementById('incrementoImpar')
boton_Impar.onclick = () => store.dispatch(incrementoImpar())
 