
// console.log(process);
//Object.keys(process);
const commands = require('./commands/index.js');
// const commands = {
//     ls: function(file, done) {
//       var output = "";
//       fs.readdir('.', function(err, files) {
//         files.forEach(function(file) {
//           output += file.toString() + "\n";
//         })
//         done(output);
//       });
//     }
//   }

// const cmd = 'pwd';

// commands[cmd]() // la función dentro de la propiedad pwd

function done(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  let arg = data.toString().trim().split(" ");
  var cmd = arg.shift(); // remueve la nueva línea
  //process.stdout.write('You typed: ' + cmd);
  if(commands[cmd]) { 
    commands[cmd](arg)
  }
  else {
    process.stdout.write("El comando NO es valido");
  }
  process.stdout.write('\nprompt > ');
});








  