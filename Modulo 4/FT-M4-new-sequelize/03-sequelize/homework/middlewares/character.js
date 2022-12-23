const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post("/", async(req, res)=>{ //en esta ruta no hace falta poner Characters ya que ya esta configurado externamente para que vaya alli
    const { code, name, age, race, hp, mana, date_added } = req.body
    if(!code || !name || !hp || !mana ){
        return res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
        const newCharacter = await Character.create({code, name, age, race, hp, mana, date_added})
        return res.status(201).json(newCharacter)
    } catch (err) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});

router.get('/', async(req, res) =>{
    const { race, age } = req.query
    const condition = {}
    const where = {}
   if(race){
        where.race = race
    } 
    if(age) {
        where.age = age
    }
    condition.where = where;
    const razas = await Character.findAll(condition) 
   return res.json(razas)
});


// router.get("/", async(req, res)=>{
//     const { race } = req.query
//     if(!race){
//         const personajes = await Character.findAll( {where: {race} } )
//         return res.json(personajes)
//     }
//     const razas = Character.findAll( {where: {race} } )
//     return res.json(razas)
// });

router.get("/roles/:code", async(req, res)=>{
    const { code } = req.params
    try {
        const personaje = await Character.findOne({
            whare:{code},
            include: Role
        })
        return res.json(personaje)
    } catch (err){
        return res.status(404).send(err)
    }
});


router.get("/:code", async(req, res)=>{
    const { code } = req.params
    const personaje = await Character.findByPk(code)
    if(!code || !personaje){
        return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    }
    return res.json(personaje)
});


router.get('/young', async (req,res) =>{
    const personajes = await Character.findAll({
        where:{ age:{ [Op.lt]:25 } }
    })
    return res.status(200).json(personajes);
});

router.put('/addAbilities', async (req,res) =>{
    const { codeCharacter, abilities } = req.body
    try {
        const personaje = await Character.findByPk(codeCharacter)
        let arrAbility = abilities.map(a => personaje.createAbility(a))
        await Promise.all(arrAbility)
        return res.send("Abilities added")
    } catch (err){
        return res.status(404).send(err)
    }
});

router.put('/:attribute', async (req,res) =>{
    const { attribute } = req.params;
    const { value } = req.query;
    await Character.update( {[attribute]: value},          // recordar una vez que llamamos a las,
        { where :{ [attribute]:{ [Op.eq]: null } }         // params en las rutas, utilizarlos dentro
        })                                                 // un arreglo, para que de esa forma se "evalue"   
    return res.status(200).send('Personajes actualizados') // el contenido del arreglo, que va a representar un atributo
});




module.exports = router;