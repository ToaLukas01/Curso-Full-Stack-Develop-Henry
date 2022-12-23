// import React from 'react';
// import { connect } from 'react-redux';
// import Todo from "../Todo/Todo";
// import { Link } from 'react-router-dom';

// export function Todos({toDos, status}) {
//   return (
//     <div>
//       {toDos && toDos.filter((todo) => (todo.status === status))
//           .map((toDo) => {
//             return (
//               <Link key={toDo.id} to={`/edit/${toDo.id}`}>
//                 <Todo  title={toDo.title} />
//               </Link>
//             );
//        })}
//     </div>
//   )
// };

// const mapStateToProps = (state)=>{
//   return {
//     toDos: state,
//   };
// };

// export default connect(mapStateToProps,{})(Todos);

import React from 'react';
import { connect } from 'react-redux';
import Todo from '../Todo/Todo';
import { Link } from 'react-router-dom';

export function Todos(props) {
  return (
    <div>
      <span>{props.status}</span>
      
      {console.log(props.id)}
      {props.toDos?.filter((todo) => todo.status === props.status).map((todo) => 
      { return (
        <React.Fragment>
        <Link to={`/edit/${todo.id}`}>       
          <Todo
            key={todo.id} 
            title={todo.title}
          />
        </Link>
        </React.Fragment>

      )
      })}
    </div>
  )
};

export const mapStateToProps = (state) => {
  return {toDos: state};
};

export default connect(mapStateToProps, null)(Todos);