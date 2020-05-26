import React, { useEffect } from 'react'
import {    
    Redirect
} from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux'
import { checkLogged } from '../store/actions/users.actions';
const Preload = ({location}) => {
    const { user } = useSelector(state=>state)
    const dispathc= useDispatch()
    useEffect(()=>{
        dispathc(checkLogged())
    })
    
    if (!user.load) {
        return(
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
        )
    }
    return(
        <div>
            Cargando
        </div>
    )
}

export default Preload