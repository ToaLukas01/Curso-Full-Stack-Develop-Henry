// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
server.use(express.json());


server.post('/posts', function(req, res){
    //res.send('Hola mundo!'); // response "Hola mundo!" en la pagina principal
    const { author, title, contents } = req.body  // le indicamos al objeto de la constante que copie los valores que se encuentran en el body
    
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    } 
    const newPost = {
        id: posts.length +1,
        author,
        title,
        contents
    } 
    posts.push(newPost)
    res.json(newPost) //responde al servidor la nueva post traducido en formato JSON
});


server.post("/posts/author/:author", function(req, res){
    const { title, contents } = req.body
    const { author } = req.params //aqui requerimos que al objeto author copie el contenido del parametro con el mismo nombre

    if(!author || !title || ! contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const newPost = {
        id: posts.length +1,
        author,
        title,
        contents
    } 
    posts.push(newPost)
    res.json(newPost)
});


server.get( "/posts", function(req, res){
    const { term } = req.query // con req.quey estamos indicando que se busque el termino term en dondea sea que se encuentre, ya sea una ID o un nombre de clase
    if(!term){
        return res.json(posts)
    } else {
        const encontrados = posts.filter( (p) => (p.title.includes(term) || p.contents.includes(term)) )
        return res.json(encontrados)
    } 
});


server.get( "/posts/:author", function(req, res){
    const { author } = req.params //sacamos/copiamos el parametro autor de la URL
    const autor = posts.filter( a => (a.author === author))
    if(!autor.length){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    } 
    return res.json(autor)  
});


server.get( "/posts/:author/:title", function(req, res){
    const { author, title } = req.params //sacamos/copiamos el parametro autor de la URL
    const autor = posts.filter( a => (a.author === author && a.title === title))
    if(!autor.length){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    } 
    return res.json(autor) 
});


server.put( "/posts", function(req, res){
    const { id, title, contents } = req.body
    if( !id || !title || !contents ){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const encontrados = posts.find( p => (p.id === id))
    if(!encontrados){
        res.status(STATUS_USER_ERROR).json({error: "No existen Post con el id provisto"})
    };
    encontrados.title = title;
    encontrados.contents = contents;
    return res.json(encontrados)
});

server.delete( "/posts", function(req, res){
    const { id } = req.body
    if(!id){
        res.status(STATUS_USER_ERROR).json({error: "No se recivio un ID"})
    }
    const borrado = posts.find( p => (p.id === id))
    if(!borrado){
        res.status(STATUS_USER_ERROR).json({error: "No se recivio un ID"})
    }
    posts =  posts.filter( p => (p.id !== id))
    return res.json({ success: true })
});

server.delete( "/author", function(req, res){
    const { author } = req.body
    if(!author){
        res.status(STATUS_USER_ERROR).json({error: "No se encontro el author"})
    }
    const borrados = posts.filter( p => (p.author === author))
    posts =  posts.filter( p => (p.author !== author))
    if(!borrados.length){
        res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    return res.json(borrados)

});


module.exports = { posts, server };
