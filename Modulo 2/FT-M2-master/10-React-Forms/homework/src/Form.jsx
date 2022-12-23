import React from 'react';

// export default function  Form() {
//   return (
//       <div>
//         Componente Form
//       </div>
//   )
// }

export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = 'Username is invalid';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  return errors;
};


export default function  Form() {
  const [errors, setErrors] = React.useState({});
  // const [username, setUsername] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [input, setInput] = React.useState({
    username: '',
    password: '',
  });
  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
  
  // const handleInputChange = function(e) {
  //   setInput((prevState) => {
  //     const newState = {
  //         ...prevState,
  //       [e.target.name]: e.target.value,
  //     };
  //     const err = validate(newState);
  //     setErrors (err);
  //     return newState;
  //   });
  // };

  return (
    <form >
      <div display='flex'>
        <label>Username:</label>
        <input className={errors.username && 'danger'}
          type="text" name="username" onChange={handleInputChange} value={input.username} className={errors.username && "danger"}/>
        {errors.username && (<p className="danger">{errors.username}</p> )}
      </div>
      <div display='flex'>
        <label>Password:</label>
        <input className={errors.password && 'danger'}
          type="password" name="password" onChange={handleInputChange} value={input.password} className={errors.password && "danger"} />
        {errors.password && (<p className="danger">{errors.password}</p>)}
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}