

function date(){
    process.stdout.write(Date());
}
function pwd(){
    process.stdout.write(process.cwd());
}
const fs = require('fs');

function ls(){
    fs.readdir('.', function(err, files) {
    if (err) throw err;
        files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
        })
        process.stdout.write("\nprompt > ");
    });
}

function echo(arg){
    process.stdout.write(arg.join(" "))
}

function cat(arg){
    fs.readFile(arg[0],"utf-8", function (error, data){
        if (error) throw error
        process.stdout.write(data);
        process.stdout.write("\nprompt > ");
    })
}

function head(){
    fs.readFile(arg[0],"utf-8", function (error, data){
        if (error) throw error
        let respons = data.split("\n").slice(0,10).join("\n");
        process.stdout.write(respons);
        process.stdout.write("\nprompt > ");
    })
}

function tail(){
    fs.readFile(arg[0],"utf-8", function (error, data){
        if (error) throw error
        let respons = data.split("\n").slice(-10).join("\n");
        process.stdout.write(respons);
        process.stdout.write("\nprompt > ");
    })
}

const request = require("request")
function curl(arg){
    request(arg[0], function(error, response, body){
        if (error) throw error
        process.stdout.write(body);
        process.stdout.write("\nprompt > ");
    })
}
    
module.exports = {
     date,
     pwd,
     ls,
     echo,
     cat,
     head,
     tail,
     curl,
}