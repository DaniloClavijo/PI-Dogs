import axios from 'axios'
// ACA SOLO DESPACHAMOS LAS ACCIONES , LA LOGICA HACERLA EN EL REDUCER 

export  function getDogs(){

    return async function(dispatch){

        var json = await axios.get('http://localhost:3001/dogs')

        

        return dispatch({
            type: 'GET_DOGS' , 
            payload : json.data
        })
    }
}

export function getTemperaments() {


    return async function (dispatch) {
        // le paso la ruta que me cree en el back que me trae todos los personajes 
        var temperaments = await axios.get('http://localhost:3001/temperaments') 
        
        var temperamentsMap =temperaments.data.map(t => t.name)

        //console.log('HOLA ESTOS SON LOS TEMPERAMENTOS: ' ,temperaments.data.map(el => el.name))
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: temperamentsMap
        })

    }
}



export function filterByCreated(payload) {

        console.log(payload)

        return ({
            type: 'FILTER_BY_CREATED',
            payload 
        })  
}


export function filterByTemperament(payload) {

    console.log(payload)

    return ({
        type: 'FILTER_BY_TEMPERAMENT',
        payload 
    })  
}


export function filterByName(payload) {

    console.log(payload)

    return ({
        type: 'ORDER_BY_NAME',
        payload 
    })  
}

export function filterByWeight(payload) {

    console.log(payload)

    return ({
        type: 'ORDER_BY_WEIGHT',
        payload 
    })  
}

// hago una funcion que tenga la accion que quiero , la logica de dicha funcion la hago en el reducer 

export function GetNameDog (name){

    //console.log(name)
    // lo que recibira esta funcion es el nombre que escriba el usuario 

    return async function(dispatch){

        try {

        var json = await axios.get('http://localhost:3001/dogs?name=' + name)


        return dispatch({
            type : 'SEARCH_BY_NAME',
            payload : json.data  // si yo en el servidor cuando levante el back pongo en la routa http://localhost:3001/dogs?name=name
            // name sera lo que yo busco 
        })

    } catch (error) {
        console.log(error)
            
    }
    }
}

 export function postDog (payload){

    return async function (dispatch) {
    
        try {


            const  response = await axios.post('http://localhost:3001/dog',payload)

            console.log(response)

            return response
            
        } catch (e) {
            console.log(e)
        }
 }
}

export function getDetail(idDog){
    return async function(dispatch){
        try {

            var json = await axios.get('http://localhost:3001/dogs/' +idDog)

            return dispatch({
                type : 'GET_DETAIL',
                payload : json.data
            })
            
        } catch (error) {
            console.log(error)
            
        }
    }
}