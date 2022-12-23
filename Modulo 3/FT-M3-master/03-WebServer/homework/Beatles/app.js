var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


http.createServer(function(res, req){
  if (req.url === "/api"||req.url === "/api/"){
    res.writeHead(200, {"Content-Type": "application/json"})
    return res.end(JSON.stringify(beatles)); //convierte objeto en cadena de texto
  }

  if (req.url.substring(0,5) === "/api/" && req.url.length > 5) { //substring extrae caracteres desde indiceA hasta indiceB sin incluirlo.
    let beatle = req.url.split("/").pop();  //por cada URL la separa en cada "/" y mete cada palabra como un elemento string en un arreglo....luego pop() nos devuolvera el ultimo elemento del arreglo (en este caso el nombre del beatle pedido)
    let beatleEncontrado = beatles.find(e => beatle.toLowerCase() === encodeURI(e.name).toLowerCase() ) //entramos al beatle con el nombre coincidente
    // la funcion encodeURI nos tranforma los distiontos tipos de strings al codigo URI para su comparacion (tambien lo mismo pero a la inversa con la funcion decodeURI)  //beatles.find(({name}) => name === "John Lennon")
    if(beatleEncontrado){
      res.writeHead(200, {"Content-Type": "application/json"});
      return res.end(JSON.stringify(beatleEncontrado))
    } else {
      res.writeHead(404,{"Content-Type": "text/plain"} )
      return res.end("el Beatle no existe")
    }   
 }

  if(req.url === "/"){
    let dato = fs.readFileSync(`${__dirname}./index.html`, "charset=utf-8") //$__dirname copia el directorio en el cual estoy paradoS
    res.writeHead(200, {"Content-Type": "application/json"})
    return res.end(dato);
 }

  if(req.url[0] === "/" && req.url.length > 1){
    let html = fs.readFileSync(`${__dirname}./index.html`, "charset=utf-8")
    res.writeHead(200, {"Content-Type": "application/json"})
    return res.end(html);
 }

  let beatle = req.url.split("/").pop();  
  let beatleEncontrado = beatles.find(e => beatle.toLowerCase() === encodeURI(e.name).toLowerCase() )
  if(beatleEncontrado){
    res.writeHead(200, {"Content-Type": "text/html"})
    let html = fs.readFileSync(`${__dirname}./beatle.html`, "charset=utf-8")
    return res.end(html);
  } else {
    res.writeHead(404,{"Content-Type": "text/plain"} )
    return res.end("el Beatle no existe")
  } 

}).listen(3000, '127.0.0.1');


