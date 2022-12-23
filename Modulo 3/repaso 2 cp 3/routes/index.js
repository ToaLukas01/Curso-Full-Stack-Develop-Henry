"use strict";

var express = require("express");

var router = express.Router();



const models = require("../models/model");


// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
router.get("/houses", (req, res)=>{
    const casas = models.listHouses()
    return res.status(200).json(casas)
});

router.post("/houses", (req, res)=>{
    const { house } = req.body
    const casa = models.addHouse(house)
    return res.status(200).json(casa)
});

router.get("/characters", (req, res)=>{
    const { house, fullname } = req.body
    const personaje = models.listCharacters(house, fullname)
    return res.status(200).json(personaje)
});

router.post("/characters", (req, res)=>{
    const { name, lastName, house, dateOfBirth, isMuggle } = req.body
    if(!models.listHouses().includes(house)){
        return res.status(404).json({ msg: "La casa ingresada no existe" });
    }
    models.addCharacter(name, lastName, house, dateOfBirth, isMuggle)
    const newPersonaje = models.listCharacters(house).find(ch => ch.name === name)
    return res.status(200).json(newPersonaje)
});

router.get("characters/:houseName", (req, res)=>{
    const { houseName } = req.params;
    const { fullName } = req.query;
    if (fullName) {
        return res.json(models.listCharacters(houseName, fullName));
    }
    if (!models.listHouses().includes(houseName)) {
        return res.json([]);
    } else {
        return res.json(models.listCharacters(houseName));
    }
});

router.get("/spells", (req, res)=>{
    const { name } = req.query
    const hechizos = models.showSpells(name)
    return res.status(200).json(hechizos)
});

router.post("/spells", (req, res)=>{
    const { name, id, spellName, description } = req.body
    models.addSpell(name, id, spellName, description)
    return res.status(201).json({ msg: "Hechizo agregado correctamente" })
});

router.get("/wand", (req, res)=>{
    const { name } = req.body
    const varita = models.showWand(name)
    return res.status(200).json(varita)
});

router.post("/wand", (req, res)=>{
    const { name, wood, core, length } = req.body
    const personaje = models.listCharacters().find(ch => ch.name === name)
    if(!personaje){
        return res.status(201).json([])
    }
    if(personaje.wand.wood){
        return res.status(201).json("Ya existe una varita para este personaje")
    }
    models.addWand(name, wood, core, length)
    return res.status(201).json("varita agregada correctamente")
});



module.exports = router;