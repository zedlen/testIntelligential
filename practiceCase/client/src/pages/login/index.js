import React, { useState, useEffect } from 'react'
import {
    LoginContainer,
    LoginForm,
    LoginInput,
    LoginButton
} from './style'
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { login, checkLogged } from '../../store/actions/users.actions';


const Login = ({history}) => {
    const userData = useSelector(state=>state.user)
    const [user, setUser]=useState(null)
    const [password, setPassword]=useState(null)
    const dispathc = useDispatch()
    useEffect(() => {
        if(userData.load){
            dispathc(checkLogged(history))
        }        
    })
    const makeLogin = (event) => {
        event.preventDefault();
        event.stopPropagation();        
        if (user && password ) {     
            dispathc(login(history,{user,password}))                               
        } else {
            alert('Usuario y contraseña son requeridos')
        }
    }
    const inputChange = (e) =>{
        if (e.target.name === "user") {
            setUser(e.target.value)
        } else {
            setPassword(e.target.value)
        }        
    }

    return(        
        <LoginContainer>
            <LoginForm onSubmit={makeLogin}>
                <LoginInput 
                    onChange={inputChange} 
                    placeholder="Usuario" 
                    name="user" 
                />
                <LoginInput 
                    onChange={inputChange} 
                    placeholder="Contraseña" 
                    name="password"
                    type="password"
                />
                <LoginButton>
                    Iniciar Sesión
                </LoginButton>
            </LoginForm>
        </LoginContainer>
    )
}

export default withRouter(Login);