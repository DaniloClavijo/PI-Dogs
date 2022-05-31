import React from "react";


export default function Paginado({dogsPerPage , allDogs , paginado}){

    const pageNumbers = []

    // i va a recorrer Math.ceil(allDogs/DogsPerPage)
    // eso sera el numero redondo de dividir todos los Dogs / los perros por pagina que quiero 

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        
        pageNumbers.push(i)// sera un arreglo de numeros que era el resultado de dividirMath.ceil(allDogs/DogsPerPage) 
        
    }

    return(
        <nav>
            <ul>
               
                    {pageNumbers && pageNumbers.map(number => (
                         <li key = {number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                   ))}
              
            </ul>
        </nav>
    )
}