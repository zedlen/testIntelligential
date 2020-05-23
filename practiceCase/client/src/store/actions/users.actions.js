import AxiosService from "../../services/api";
import { USER_LOGGED, USER_PROFILE_LOADED, USER_LOGOUT } from "../constants";

export function login(history, data){
    return async function (dispatch){
        try{
            const response = await AxiosService.post('/autheticate', data)
            console.log('respuesta',response)
            if (response.status === 404) {
                alert('Usuario o contraseña incorrectos')
            }
            if (response.status === 200) {                
                dispatch({type: USER_LOGGED, token:response.data.token})
                localStorage.setItem('token', response.data.token)
                const responseProfile = await AxiosService.get('/profile',{ headers:{'access-token':response.data.token}})
                if (responseProfile.status === 200) {       

                    dispatch({type: USER_PROFILE_LOADED, data: responseProfile.data})
                    history.push('/home')
                }                
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function checkLogged(history){
    return async function (dispatch){
        try{
            const token = localStorage.getItem('token')   
            if(token){
                const responseProfile = await AxiosService.get('/profile',{ headers:{'access-token':token}})
                if (responseProfile.status === 200) {       
                    dispatch({type: USER_LOGGED, token:token})            
                    dispatch({type: USER_PROFILE_LOADED, data: responseProfile.data})
                    history.push('/home')
                }  
            }                     
        } catch(e){
            console.log('error')
        }        
    }
}

export function logOut() {
    return async function (dispatch){
        try{
            localStorage.removeItem('token')
            dispatch({type: USER_LOGOUT})
        } catch(e){
          
        }        
    }
}