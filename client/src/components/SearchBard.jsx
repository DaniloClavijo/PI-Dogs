import {React , useEffect, useState} from "react";

import { useDispatch } from "react-redux";



// que me tengo que traer del back para poder buscar algo por name ?
// R/  la routa que le pega al name esa logica deberia estar en acciones 

import { getDogs, GetNameDog } from "../actions";

export default function SearchBard (){

    const dispatch = useDispatch();

    // creo un estado local donde se va a guardar lo que escriba el usuario en un campo input que se le dara 

    const [name , setName] = useState('');


    // funcion que va a manejar todo lo que se ponga en el input del search , la guardara en el estado name , ahi quedara guardado lo que escriba el usuario 
    function handleInput(e){

        e.preventDefault();
        setName(e.target.value)
        console.log(name)

    }

    // Funcion que va a disparar la accion de buscar un dog por name 

    function handleSubmit(e){
        e.preventDefault()
        // despacho la accion 
        dispatch(GetNameDog(name))
    }



    



    return (
        <div>

            <input
            type='text'
            placeholder="search raza by name " 

            onChange={e =>handleInput(e)}

            />

            <button onClick={e => handleSubmit(e)} type='submit'>Buscar </button>










        </div>
    )
}







