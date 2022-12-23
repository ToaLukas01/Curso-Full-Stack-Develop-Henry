//ejercicio 1) mostrar lista de amigos
$(document.querySelector("#boton")).click( function(){
    //axios("http://localhost:5000/amigos")
    //.then(amigos =>{
    $.get("http://localhost:5000/amigos" , function(amigos){
        var lista = document.getElementById("lista");
        $("#lista").empty() //esta linea de codigo nos indica que NO SE REPITA la lista de for una vez ya accionada (borra la lsita anterior y muestra la generada en la nueva isntancia)
        for(let i=0; i < amigos.length; i++){
            var elemento = document.createElement("li");
            elemento.innerText = amigos[i].name;
            lista.appendChild(elemento);
        }
    })
})

//ejercicio 2) mostrar un amigo particular
$(document.querySelector("#search")).click( function(){
    var amigo =  parseInt(document.querySelector("#input").value);  //parseInt(getElementById("input").value);
    $.get("http://localhost:5000/amigos" +"/"+ amigo , function(nombre){  //`http://localhost:5000/amigos/${amigo}`
    var span = document.createElement("amigo");
    span.innerText = nombre.name;
    $("#amigo").append(span);
    })
})


//ejercicio 3) eleiminar un amigo particular
let deleteInput = document.getElementById("inputDelete").value
let deleteBoton = document.getElementById("delete").addEventListener("click", deleteFriend(id))
let span = document.getElementById(sucess)

function deleteFriend(id){
    axios.delete(`http://localhost:5000/amigos${id}`)
    .then(respuesta =>{
        span.innerText = "Amigo eliminado exitosamente"
        deleteInput.value = ""
    })
}