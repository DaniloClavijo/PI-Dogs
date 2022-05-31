import {React , useEffect} from "react";
import {Link , useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getDetail } from "../actions";


export default function Detail (props){

    const {id} = props.match.params ;
    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch,id])

    const MyDog = useSelector( (state) => state.detail )

    return (
        <div>
            <Link to = '/home'>
                <button>Volver</button>
            </Link>

            { MyDog.length ? 
            <div>

                <h1> {MyDog[0].name}</h1> 
                <h1> {<img src={MyDog[0].image} alt="img not found" width='500px' height='500px'/>}</h1>
                
                
            </div>

            }







        </div>
    )

}
