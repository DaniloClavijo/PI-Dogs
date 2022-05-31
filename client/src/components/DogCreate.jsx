import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getTemperaments, postDog } from "../actions";

export default function DogCreate() {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  // const [errors,setErrors] = useState({})

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    temperament: [],
    heightMin: "",
    heightMax: "",
    weightMax: "",
    weightMin: "",
    life_span: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);


  // funcion que se encarga de manejar y atrapar todos los input y guardarlos en el estado local 

  function handleChangeInput(e){

    setInput({
      ...input,
      [e.target.name ]: e.target.value
    })

    console.log(input)

  }


  // funcion que se va a encargar de manejar lo que el usuario seleccione en el las opciones del select y lo va a guardar en mi estado input

  function handleSelectOptions (e){

    setInput({
      ...input, // todo lo que ya tenia mi estado input 
      temperament : [...input.temperament , e.target.value]
      // en la prop de el estado input llamada temperament le voy a pasar como valor lo que ya tenia el estado input.temperament en esa prop + lo que el usuario va a ir seleccionando como opcion. lo que hara es ir cargando en ese array cada opcion seleccionada por el usuario 

    })
  }
  return (
    <React.Fragment>
      <Link to="/home">
        <button>VOLVER</button>
      </Link>
      <h1>hola perro </h1>

      <form>


        <div>
            <label>Nombre</label>
            <input
            type="text"
            placeholder="ingrese la raza"
            value={input.name}
            name="name"
            onChange={e=> handleChangeInput(e)}
          />
        </div>


        <div>
            <label>Altura Min</label>
            <input
            type="text"
            placeholder="ingrese la altura Minima"
            value={input.heightMin}
            name="heightMin"
            onChange={e=> handleChangeInput(e)}
          />
        </div>


        <div>
            <label>Altura Max</label>
            <input
            type="text"
            placeholder="ingrese la altura Maxima"
            value={input.heightMax}
            name="heightMax"
            onChange={e=> handleChangeInput(e)}
          />
        </div>


        <div>
            <label>Peso Minimo</label>
            <input
            type="text"
            placeholder="ingrese peso Minimo"
            value={input.weightMin}
            name="weightMin"
            onChange={e=> handleChangeInput(e)}
          />
        </div>

        <div>
            <label>Peso Maximo</label>
            <input
            type="text"
            placeholder="ingrese peso Maximo"
            value={input.weightMax}
            name="weightMax"
            onChange={e=> handleChangeInput(e)}
          />
        </div>

        <div>
            <label>Años de vida</label>
            <input
            type="text"
            placeholder="ingrese Años de vida"
            value={input.life_span}
            name="life_span"
            onChange={e=> handleChangeInput(e)}
          />
        </div>

        <div>
            <label>Imagen</label>
            <input
            type="text"
            placeholder="ingrese una Imagen"
            value={input.image}
            name="image"
            onChange={e=> handleChangeInput(e)}
          />
        </div>

        {/* <div >
                    <label>
                        {temperaments.map((e, index) => { 
                            return (
                            <div key = {e}>
                                <span>{e}</span>
                             <input type="checkbox" 
                             name = {e} 
                             value = {index + 1} 
                            />
                             </div>
                        )})}
                     </label>
         </div> */}

         <div>

           <label>elije sus temperamentos</label>
           <select>
             {
               temperaments.map(t => (

             <option value={input.t} >{t} </option>

               ))


             }

           </select>

         </div>

           <button type='submit' > Crea Tu raza de Perro!</button>



      </form>
    </React.Fragment>
  );
}
