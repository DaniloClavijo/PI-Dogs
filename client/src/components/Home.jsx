import React  from 'react';
import { Link } from 'react-router-dom';
import {useState , useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';

// importo las accciones que voy a usar 

import {getDogs , getTemperaments ,filterByCreated , filterByTemperament , filterByName ,filterByWeight} from '../actions';

import Card from './Card';
import Paginado from './Paginado';
import SearchBard from './SearchBard';


//**********************************//
export default function Home(){

    //*********estado para que se renderice mi pagina con elordenamiento por Name *********** //

    const [order , SetOrder] = useState('')


    const dispatch = useDispatch(); 

    const allDogs = useSelector((state) => state.dogs);

    const temperaments  = useSelector((state) => state.temperaments)
    
    //****************PAGINADO******************//
    
    //DEFINO VARIOS ESTADOS LOCALES 
    
    // 1) estado en el cual tenga la pagina actual y un set de esa pagina actual
    
    const [currentPage,SetCurrentPage] = useState(1); // seteo esa pagina actual en (1)

    // 2) estado en el cual la cantidad de perros por pagina y una variable para poder setear la cantidad de perros que quiero.

    const [dogsPerPage,setDogPerPage] = useState(8) // en este caso segun el readmi pide que los perros mostrados por pagina sean (8)

    // 3) creo una constante en la cual voy a tener el indice (es un array) de el ultimo dog que tengo en la pagina 

    const indexOfLastDogs = currentPage * dogsPerPage ;  // 8

     // 4) creo una constante en la cual voy a tener el indice (es un array) de el primer dog que tengo en la pagina 

    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage;  // 8-8 = 0 

    // 5)  creo una variable que sera la que usare para renderizar; la cual sera la cantidad de dogs que tengo en la pagina actual ... constante que guarde todos los personajes en cada pagina ... en donde tengo todos los perros? en mi constante allDogs.. 
    // entonces puedo usar un slice (divide un array y tomar una porcion dependiendo lo que le pase por parametro )


    const currentDogs = allDogs.slice(indexOfFirstDogs , indexOfLastDogs)
    // aca estaria dividiendo todo mi array desde la posicion 0 hasta la posicion 8 

    // pagina actual **** indice primer Dog**** indice ultimo dog

    //    1          ||         0           ||           8

    //    2          ||         9            ||          16


    // 6) hago una funcion llamada paginado a la cual le paso el numero de la pagina actual , y la logica que hara esa funcion es setear la pagina actual en el numero de pagina que me pasan por la funcion (me ayudara al renderizado)

    function paginado(pageNumber){

        SetCurrentPage(pageNumber)

    }
    // traer del estado los dogs cuando el componente se monte 

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments());
    },[dispatch]);

    
    function rechargePage(e){
        e.preventDefault(e);
        dispatch(getDogs());
    }

      //funcion para tomar el select de temperamentos y despachar la accion de filtrar temp, para renderizar los dogs fitrados    
      function handleFilterByTemperament (e){
        e.preventDefault(e)
        SetCurrentPage(1)
        dispatch(filterByTemperament(e.target.value))

    }
    //funcion para tomar el select de Razas Todas / Creadas / Existentes y despachar la accion filterByCreated
    function handleCreated (e){
        dispatch(filterByCreated(e.target.value))
        SetCurrentPage(1)
    }
  
    function handleOrderByName(e){
        e.preventDefault(e)
        dispatch(filterByName(e.target.value))
        SetCurrentPage(1)
        SetOrder(e.target.value)
    }

    function orderByWeight(e){
        e.preventDefault(e)
        dispatch(filterByWeight(e.target.value))
        SetCurrentPage(1)
        SetOrder(e.target.value)
        
    }



    return(

        

        <div>

            

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} ></Paginado>
            <SearchBard/>

            <Link to = '/dog'>Crea tu Propia Raza de Perro</Link>

            <h1>Bienvenidos a la super Pagina de raza de perros</h1>

            <button onClick={e => {rechargePage(e)}}>recargar pagina</button>

            <div>
              

                <select onChange={e => handleCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='Created'>Creados por Ti </option>
                    <option value='Api'>Api</option>
                </select>
                
                <select onChange={e => handleOrderByName(e)}>
                     <option value='All'>Todos</option>
                    <option value='asc'>A to Z</option>
                    <option value='des'>Z to A</option>
                </select>

                <select onChange={e => orderByWeight(e)}>
                    <option value='All'>Todos</option>
                    <option value='pesado'>Mayor Peso</option>
                    <option value='liviano'>Menor Peso</option>
                </select>


                <select onChange={e =>handleFilterByTemperament(e)}>
                    <option value ='All'>All Temperaments</option>
                   {  
                       temperaments.map( el => {
                           return(
                            <React.Fragment key={el}>
                                       <option value ={el}>{el}</option>    
                            </React.Fragment>               
                           )
                       })
                   }
                   </select>

                {
                    currentDogs.map( el => {

                        return(
                            <React.Fragment key={el.id}>
                                <Link to ='/home'>

                                <Card name ={el.name} image ={el.image} temperament={el.temperament.join(' - ')
                                } weightMax={el.weightMax} weightMin={el.weightMin}/>
                                </Link>
                                </React.Fragment>
                           
                        )
                   })}

                   

                   
                   



            </div>
        </div>







    )



}
