const { Router } = require('express');
const { Ability } = require('../db');
const Character = require('../db/models/Character');
const { set } = require('../server');
const router = Router();

router.post('/', async (req,res) =>{
    const { name, description, mana_cost } = req.body
    if(!name || !mana_cost){
        return res.status(404).send("Falta enviar datos obligatorios")
    }
    const habilidad = Ability.create({name, description, mana_cost})
    return res.status(201).json(habilidad)
});

router.put('/setCharacter', async (req,res) =>{
    const { idAbility, codeCharacter } = req.body
    try {
        const habilidad = await Ability.findByPk(idAbility)
        if(habilidad){
           await habilidad.setCharacter(codeCharacter)
           return res.json(habilidad)
        } else {
            return res.status(404).send("Ability not found")
        }
    } catch(err){
        return res.status(404).send(err)
    }
});



module.exports = router;