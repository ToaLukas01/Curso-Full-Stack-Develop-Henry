import { INCREMENT, DECREMENT, ODD, ASYNC } from '../actions';

const initialState = {
  count: 0
}

// Nuestro reducer que maneja nuestros dos casos de acción incremento y decremento.
// Recibe el estado de nuestro store, junto con una action creada por nuestro action creator. 
// ¿Qué tiene que hacer el reducer con el contador de cada caso?
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:return {
      ...state,
      contador: state.contador + 1}
    case DECREMENT: return {
      ...state,
      contador: state.contador -1}
    case ODD: 
      if(state.contador % 2 !== 0){
        return {
          ...state,
          contador: state.contador + 1}
      }
    case ASYNC: return {
      ...state,
      contador: state.contador + 1}
    default:
      return state;
  }
};


