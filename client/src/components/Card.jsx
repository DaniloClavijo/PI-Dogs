import React from "react";

export default function Card({image , name , temperament , weightMax ,weightMin}){

    return(

        <div>

            <img src={image} alt='img not found' width='350px'  height='350px' />

            <h1>{name}</h1>

            <h2>{temperament}</h2>

            <h5>Peso Max: {weightMax}Kg     Min: {weightMin}Kg</h5>

        </div>


    )
}