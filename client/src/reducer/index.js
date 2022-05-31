// el reducer es el que recibe la accion mira si es correcta y retorna el estado , se deben importar las acciones para que el reducer sepa de que acciones le hablamos ( las acciones me las traigo del store)




// ME CREO UN ESTADO INICIAL 

const initialState = {
    dogs: [], //aca voy a tener todo lo que me devuelve el back la info que requiero en mi pagina principal home

    AllDogsCopy: [],//copia del estado q siempre va a tener todos los dogs
    temperaments: [], // aca voy a tener un tipo de 'filtrado' desde el back en el cual me traigo un array de string de temperamentos 
    details :  []
    

}

// esta funcion recibe 2 parametros el estado = estado inicial y la accion 
function rootReducer(state = initialState, action) {

    switch (action.type) {

        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                    // es lo que me devuelve la funcion ( para mi caso lo que hay en mi routa de back /dogs) me traiga todos los detalles de los perros 

                    //hago una copia de dogs como respaldo 
                AllDogsCopy: action.payload

            }
            case 'GET_TEMPERAMENTS':
                return {
                    ...state,
                    temperaments: action.payload // es lo que me devuelve la funcion ( para mi caso lo que hay en mi routa de back '/temperaments') me traiga todos los temperamentos  

                }
                case 'FILTER_BY_TEMPERAMENT':


                        // para hacer un filtrado de los que estan creados en la Db o los que vienen de la api , necesito tener toda la info que trae la info de la db y la bs concatenada.. en mi estado dogs tengo la infoTotal

                        
                        let filterByTemperament = action.payload === 'All' ? state.AllDogsCopy : state.AllDogsCopy.filter(t => t.temperament.includes(action.payload))

                        /* if (action.payload === 'All') {

                             filterByTemperament = state.AllDogsCopy  // siempre me traigo todos los dogs del estado inmutable

                        } else {
                            filterByTemperament = [...state.dogs].filter(t => t.temperament.includes(action.payload))
                          
                        } */

                        return {
                            ...state,
                            dogs: filterByTemperament
                        }

                case 'FILTER_BY_CREATED':


                    // para hacer un filtrado de los que estan creados en la Db o los que vienen de la api , necesito tener toda la info que trae la info de la db y la bs concatenada.. en mi estado dogs tengo la infoTotal

                    const allInfo = [...state.AllDogsCopy];

                    const createdFilter = action.payload === 'Created' ? allInfo.filter(el => el.createdInDb === true) : allInfo.filter(el => !el.createdInDb)

                    return {
                        ...state,
                        dogs: action.payload === 'All' ? state.AllDogsCopy : createdFilter
                    }

                        case 'ORDER_BY_NAME':

                            //const orderDogs = state.AllDogsCopy

                            const sortName = action.payload === 'asc' ? state.dogs.sort( (prev, next) => {

                                    if (prev.name.toUpperCase() > next.name.toUpperCase()) {
                                        //console.log(prev.name.toUpperCase())
                                        return 1;
                                    }
                                    if (prev.name.toUpperCase() < next.name.toUpperCase()) {
                                        return -1;
                                    }
                                    return 0;
                                }) 

                                     :   
                                          state.dogs.sort((prev, next)=> {
                                        if (prev.name.toUpperCase() >  next.name.toUpperCase()) {
                                            //console.log(prev.name.toUpperCase())
                                            return -1;
                                        }
                                        if (prev.name.toUpperCase() < next.name.toUpperCase()) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                            
                            return {
                                ...state,
                                dogs: action.payload === 'All' ? state.AllDogsCopy : sortName,
                            }


                            case 'ORDER_BY_WEIGHT':

                            

                            //const orderDogs = state.AllDogsCopy

                            const sortWeight = action.payload === 'pesado' ?
                            state.AllDogsCopy.sort( (prev, next) => Number(next.weightMax) - Number(prev.weightMax)) :
                            state.AllDogsCopy.sort( (prev, next) => Number(prev.weightMin) - Number(next.weightMin))  

                            
                            return {
                                ...state,
                                dogs: action.payload === 'All' ? state.AllDogsCopy : sortWeight,
                            }

                            case 'SEARCH_BY_NAME' : 


                            return{

                                ...state,
                                dogs : action.payload

                            }

                            case 'POST_DOG' : 

                            return {
                                ...state
                            }

                            case 'GET_DETAIL' : 
                              return { 
                                  ...state,
                                details : action.payload
                            }

                            default:
                                return state
    }


}

export default rootReducer;