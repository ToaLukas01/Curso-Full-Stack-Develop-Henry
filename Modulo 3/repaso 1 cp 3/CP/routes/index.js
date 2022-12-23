"use strict";

const moduls = require("../models/model");
// const { 
//     addUser,
//     listUsers,
//     switchPlan,
//     addSerie,
//     listSeries, 
//     play,
//     watchAgain, 
//     rateSerie 
// } = require("../models/model");

const express = require("express");
const e = require("express");
const { route } = require("../app");
const app = require("../app");
//const { response } = require('../app')

const router = express.Router();

router.get("/users", (req, res)=>{
    const usuario = moduls.listUsers()
    res.status(200).json(usuario)
});

router.post("/users", (req, res)=>{
    const { email, name} = req.body
    try {
        const usuario = moduls.addUser(email, name)
        res.status(201).json( { msg:usuario } )
    } catch (err) {
        res.status(400).json( {error: err.message} )
    }
});

router.patch("/users/plan", (req, res)=>{
    const email = req.query.user
    try {
        const usuario = moduls.switchPlan(email)
        res.status(200).json( { msg:usuario } )
    } catch (err) {
        res.status(404).json( {error: err.message} )
    }
});

router.get("/series", (req, res)=>{
    const serie = moduls.listSeries()
    try {
        res.status(200).json(serie)
    } catch (err) {
        res.status(400).json( {error: err.message} )
    }
});

router.post('/series', (req,res)=>{
    const { name, seasons, category, year } = req.body
    try {
        const series = moduls.addSerie(name, seasons, category, year)
        res.status(201).send({msg: series})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.get("/series/:category", (req, res)=>{
    const { category } = req.params
    try {
        const serie = moduls.listSeries(category)
        res.status(200).send(serie)
    } catch (err) {
        res.status(404).send({error: err.message})
    }
});

router.get("/play/:serie", (req, res)=>{
    const { user } = req.query
    const {serie} = req.params
    try {
        const playlist = moduls.play(serie, user)
        res.status(200).json({msg:playlist})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
});

router.get("/watchAgain", (req, res)=>{
    const email = req.query.user
    try {
        const mirando = moduls.watchAgain(email)
        res.status(200).json(mirando)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
});

router.post("/rating/:serie", (req, res)=>{
    const {serie} = req.params
    const { email, score } = req.body
    try {
        const puntaje = moduls.rateSerie(serie, email, score)
        res.status(200).json({msg:puntaje})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
});

module.exports = router;

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.

