'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if(typeof executor !== 'function'){throw new TypeError('executor no es una function')};
    this._state = 'pending',
    this._value = undefined,
    this._handlerGroups = [],
    executor(this._internalResolve.bind(this), this._internalReject.bind(this) )
}

$Promise.prototype._internalResolve = function(valor){
    if(this._state === 'pending'){
        this._value = valor,
        this._state = "fulfilled",
        this._callHandlers()
    }   
};

$Promise.prototype._internalReject = function(err){
    if(this._state === 'pending'){
        this._value = err,
        this._state = "rejected",
        this._callHandlers()
    }    
};

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length){
        const handler = this._handlerGroups.shift();
        if(this._state === "fulfilled"){
            if(typeof handler.successCb === 'function'){
                try{ //antes de resuolver el collback de success, intenta ver que no explote // try-catch se usa para cuando tenemos funciones que no sabemos si puedne fallar y evitar que jodan al programa
                    const resultado = handler.successCb(this._value)
                    if(resultado instanceof $Promise){
                        //el Handler devuelve una promesa
                        return resultado.then(
                            resuelve => handler.downstreamPromise._internalResolve(resuelve), //pasamos un sussces collback que actue como la promesa original
                            err => handler.downstreamPromise._internalReject(err) //pasamos un error collback que actue como la promesa original
                        )
                    } else {
                        // el Handler devolvio un valor
                        handler.downstreamPromise._internalResolve(resultado) //obligamos a la promesa de .then que se resuelva al valor del resultado del succes collback, para retornarlo
                    }
                } catch (err) { //si el succes exploto y devolvio un error que haga lo siguiente
                    //el Handler arrojo un error
                    handler.downstreamPromise._internalReject(err)
                }
            } else {
                handler.downstreamPromise._internalResolve(this._value)
            }
        } else if (this._state === "rejected"){
            if(handler.errorCb === 'function'){
                try{ 
                    const resultado = handler.errorCb(this._value)
                    if(resultado instanceof $Promise){
                        //el Handler devuelve una promesa
                        return resultado.then(
                            resuelve => handler.downstreamPromise._internalResolve(resuelve), //pasamos un sussces collback que actue como la promesa original
                            err => handler.downstreamPromise._internalReject(err) //pasamos un error collback que actue como la promesa original
                        )
                    } else {
                        // el Handler devolvio un valor
                        handler.downstreamPromise._internalResolve(resultado) //obligamos a la promesa de .then que se resuelva al valor del resultado del succes collback, para retornarlo
                    }
                } catch (err) {
                    //el Handler arrojo un error
                    handler.downstreamPromise._internalReject(err)
                }
            } else {
                handler.downstreamPromise._internalReject(this._value)
            }
        } 
    }
};

$Promise.prototype.then = function(solucion, err){
    if(typeof solucion !== 'function')  this._handlerGroups.push(false)
    if(typeof err !== 'function') this._handlerGroups.push(false)
    const downstreamPromise = new $Promise(()=>{}) // el then siempre devuelve una promesa, esta constante representa esa promesa que se devuelve
    this._handlerGroups.push({
        successCb: solucion,
        errorCb: err,
        downstreamPromise: downstreamPromise
    });
    if(this._state !== 'pending') this._callHandlers()
    return downstreamPromise; //retorno/devuelvo la nueva promesa de .then 
};

$Promise.prototype.catch = function(err){
    return this.then(null, err);
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
