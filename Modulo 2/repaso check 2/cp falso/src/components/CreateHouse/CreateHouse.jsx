import React from 'react';

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
// Recordar que los hooks de React deben utilizarse de la forma "React.useState", "React.useEffect", etc.
// Los tests no van a reconocer la ejecución haciendo destructuring de estos métodos.
const CreateHouse = () => { 
    const [state, setState] = React.useState({
        name: "",
        region: "",
        words: "",
    });

    const handleInputChange = (e) =>{
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.name})
    };
    return (
        <div>
            <form>
                <label>Name: </label>
                <input onChange={handleInputChange} name='name'/>

                <label>Region: </label>
                <input onChange={handleInputChange} name='region'/> 

                <label>Words: </label>
                <input onChange={handleInputChange} name='words'/>   

                <button type="submit">Create</button>     
            </form>
        </div>
    );
};

export default CreateHouse;
