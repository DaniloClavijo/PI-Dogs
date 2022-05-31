const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {API_KEY} = process.env

// importo los modelos para poder usarlos 

const { Dog, Temperament } = require('../db.js');

const db = require('../db')
const e = require('express');
// ****************************** Get API info /Bb 'Dog': ******************************
// puedo hacer una funciones controladores que voy a poder re utilizar lo que retorne mas a delante, en este caso hare un get a la api para traerme toda la informacion 
// pero con una diferencia a ' toda esa info solamente voy a traerme lo que necesito . 


// con esta funcion lo que hice fue traerme lo que necesito de la api 
const getApiInfo = async () => {

    try{

    // en esta constante voy a tener toda la info que me devuelve la api 

    //uso axios en lugar de fetch, para no tener que acomodar la respuesta con un .json

    
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    // no necesito toda la info que me entrega la api , por lo tanto voy a sacar la info que me pide el readmy solamente 

    //console.log(apiUrl)

    // en esta api hay varias razas que no tienen temperamento :  ids = 196,197,211,261, en total son 4 razas que no contienen temperamentos. 

    const apiInfo = apiUrl.data.map( el => {

        // hay 4 razas con temperamento desconocido con id = 196,197,211,261
        return{
            heightMax : el.height.metric.split(" - ")[1]? el.height.metric.split(" - ")[1]
            : el.height.metric.split(" - ")[0],
            heightMin : el.height.metric.split(" - ")[0],
            weightMax: el.weight.metric.split(" - ")[1] ? el.weight.metric.split(" - ")[1]
            : el.weight.metric.split(" - ")[0],
            weightMin: el.weight.metric.split(" - ")[0],
            id: el.id,
            image : el.image.url,
            name : el.name , 
            // tener en cuenta si mapeo algo y me da undefinded , fijarse si alguno de los campos que mapeo esta vacio, me ahorrara varias horas :D  
            temperament : el.temperament ? el.temperament.split(',').map(t=> {return t.trim()}) : ['temperamento Desconocido'],     
            life_span : el.life_span,
        }
    })

    

   // console.log(apiInfo)
    return apiInfo;
}catch(e){
    console.log(e)
}


}

// ahora debo traerme todo lo que necesito pero de la base de datos 

const getDbInfo = async () => {

    try{

    const dbInfo =  await Dog.findAll({
        include : {
            model : Temperament,
            attributes : ['name'],
            through : {
                attributes : [],
            }
        }   

    }) 
    // console.log('esto es la info de la dataBase')
    // console.log(dbInfo)
    //obtener solo el datavalue de dogs

    const dValueDogs =dbInfo.map(el => { return el.dataValues});
    
    //console.log(dValueDogs)


    const dbInfoMap = await dValueDogs.map( el => { 

       return {
           
            id: el.id,
            name : el.name , 
            temperament :  el.temperaments.map(n => n.name ),
            heightMax : el.heightMax,
            heightMin : el.heightMin,
            weightMax : el.weightMax,
            weightMin : el.weightMin,
            life_span : el.life_span,
            createdInDb : el.createdInDb,
            image : el.image,
            
             }

             
            })
    // console.log('esto es la info de la MAPEADA DE LA DATABASE')
    // console.log(dbInfoMap)
       return dbInfoMap

    }catch(error){
        console.log(error)
    }
}

// ahora tengo que concatenar toda la info , la de la db y la de la api , y retornarla

const getAllDogs = async () => {
    try{
        const apiInfo = await getApiInfo() ; 
        const dBInfo = await getDbInfo() ; 

        // en esas dos constantes tengo la info de la api y la info de la db 

        /* *********** */

        // ahora hago una variable en la cual guarde esas dos informaciones en una sola 

        const InfoTotal = dBInfo.concat(apiInfo)
        // esta constante tendra todo, me devolvera un arreglo con la dbInfo y la apiInfo juntas 

        return InfoTotal
    }catch(error){
        console.log(error)
    }
}

// ****************************** ROUTAS Get/'dogs'  ||  Get/'dogs?name=algunNombre' : ******************************

/* Routa del get/dogs */

router.get('/dogs' , async(req,res) => {

    try {

        const {name} = req.query; 
        
        let dogsTotal = await getAllDogs ();

        //console.log(dogsTotal)

        // si pasan nombre en la query es decir ?name='nombreCualquiera' has esto.
        if(name){

            let dogTitle = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))


            dogTitle.length ? res.status(200).json(dogTitle) : res.status(404).send( 'No se encuentra ninguna raza de perro con ese nombre, prueba con otro Nombre!')
        }
        // si no pasan nombre en la query has esto otro 
        else{
            res.status(200).json(dogsTotal)
        }    
    } catch (error) {
        console.log(error)
        
    }
})


// ****************************** ROUTAS Get/'dogs/{id}': ******************************


router.get('/dogs/:idRaza' , async(req,res) => {

    // en esta routa tengo que devolver una raza de perro con un id especifico, para eso me deberia traer toda la info concatenada de la api y db y filtrar dicha info donde coincida el id ingresado por params y el id de la info total 


    try {

        const {idRaza} = req.params; 
        
        
        let dogsTotal = await getAllDogs (); //tengo toda la info de api + dB 

        
    
        // si pasan un idRaza por params es decir dogs/{idRaza}
        if(idRaza){

            let findIdRaza = await dogsTotal.filter( el => el.id == idRaza)

            findIdRaza.length ? res.status(200).json(findIdRaza) : res.status(404).send( 'No existe ninguna raza de perro con ese ID , prueba con otro IdRaza!')
        }
        // si no pasan id por params has esto otro 
        else{
            res.status(200).json(dogsTotal)
        }    
    } catch (error) {
        console.log(error)
        
    }
})

// ****************************** ROUTAS Get/temperament: ****************************** GUARDAR LOS TEMPERAMENTOS QUE VIENEN DE LA API EN LA BASE DE DATOS 


// en esta routa lo primero que voy a hacer es guardar los temperamentos de cada perro en la base de datos , una vez los guarde lo que voy a hacer es mostrarlos en esta routa 

router.get('/temperaments' , async(req,res) => {

    const infoTotalApi = await getApiInfo()// me traigo todo de la api 

    const TempMap = infoTotalApi.map(t => t.temperament) // me traigo solo los temperamentos es la info que me interesa 

    
    //console.log(TempMap) // esto seria un array con array de temperamentos 
    const String = TempMap.join() // saco la info del array y la convierto  a strings 
    //console.log(String)
    const arrString = String.split(',') // convierto en array los string y los separo por coma, es decir cada posicion va a tener un temperamento
    //console.log(arrString) // al ver que me devuelve veo que se repiten temperamentos 1032 en total ... 

    // lo que debo hacer es que ese array de temperamentos debo eliminar cada temperamento repetido ...

    /* *******eliminacion de temperamentos repetidos ***** */

    const tempUnique = []; // aca voy a guardar los temperamentos que no esten repetidos 

    for(var i = 0; i < arrString.length; i++) {
 
    const temperament = arrString[i];
 
    if (!tempUnique.includes(arrString[i])) {
    tempUnique.push(temperament); 
    }
    }

    //console.log(tempUnique)

    tempUnique.forEach(el => {  // va a iterar sobre cada elemento del array 
        Temperament.findOrCreate({  // en mi modelo Temperament si no esta dicho el lo va a crear y si ya esta no lo va a crear .. 
            where : {name : el},  // guardara en el campo name cada elemento que tenga mi array de temperamentos 
          
          
        })
    });

    const AllTemperaments = await Temperament.findAll() ; // me traigo todo lo que tenga mi Modelo temperament y lo que me traigo lo guardo en una variable 

    // por ultimo lo que faltaria es enviarle esos datos cuando el usuario le pegue a dicha routa 
    //console.log(AllTemperaments.map(t => t.name))
    res.send(AllTemperaments)
})


// ****************************** ROUTAS POST/dog: ******************************
router.post('/dog', async(req,res) => {

    try {
        // hago un destructuring de lo que me manda el front por el body 
        let{
            name, 
            temperament, 
            heightMax,   
            heightMin,
            weightMax,
            weightMin,
            life_span,
            image,
            createdInDb,
        } = req.body

        //console.log(req.body)
        

        let DogCreate = await Dog.create({

            name,     
            heightMax,   
            heightMin,
            weightMax,
            weightMin,
            life_span,
            image,
            createdInDb
        });


        let temperamentDb = await Temperament.findAll({
            where : {name : temperament} 
        })

        DogCreate.addTemperament(temperamentDb)
        res.send('Tu raza de perro ha sido creada Con exito!')

    }catch (error) {
        console.log(error)
    }

})

module.exports = router;
