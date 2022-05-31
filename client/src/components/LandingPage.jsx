// importo las librerias que voy a necesitar 

import React from 'react'

import {Link} from 'react-router-dom'

// hago un componente de funcion 


export default function LandingPage(){

    return(
        <div>
            
            <h1>Bienvenidos a mi Pagina Raza de Perros</h1>

            <Link to = '/home'>  

            <button>Ingresar</button>          
            </Link>

        </div>

    )
}
