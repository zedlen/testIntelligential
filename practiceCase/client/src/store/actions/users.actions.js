import AxiosService from "../../services/api";
import { USER_LOGGED, USER_PROFILE_LOADED, USER_LOGOUT, USER_NOT_LOGGED, USERS_LOADED } from "../constants";

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
                    if(history.location && history.location.state && history.location.state.from){                         
                        history.push(history.location.state.from.pathname)
                    } else {
                        history.replace('/home')
                    }
                }                
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function checkLogged(history=null){
    return async function (dispatch){
        try{
            const token = localStorage.getItem('token')   
            if(token){
                const responseProfile = await AxiosService.get('/profile',{ headers:{'access-token':token}})
                if (responseProfile.status === 200) {       
                    dispatch({type: USER_PROFILE_LOADED, data: responseProfile.data})
                    dispatch({type: USER_LOGGED, token:token})                                
                    if(history){
                        if(history.location && history.location.state && history.location.state.from){                         
                            history.push(history.location.state.from.pathname)
                        } else {
                            history.replace('/home')
                        }  
                    }                       
                } else {
                    dispatch(logOut())
                }
            } else {
                dispatch({ type: USER_NOT_LOGGED })
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

export function listUsers(){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const response = await AxiosService.get('/users',{ headers:{'access-token':state.user.token}})
            console.log('respuesta',response)
            
            if (response.status === 200) {                
                dispatch({type: USERS_LOADED, data:response.data})
                                
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function editUsers(data){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const response = await AxiosService.put('/users/' + data.id,data,{ headers:{'access-token':state.user.token}})
            console.log('respuesta',response)
            
            if (response.status === 204) {                
                dispatch(listUsers())
                                
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function addUsers(data){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const response = await AxiosService.post('/users',data,{ headers:{'access-token':state.user.token}})
            console.log('respuesta',response)
            
            if (response.status === 200) {                
                dispatch(listUsers())
                                
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function daleteUser(id){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const response = await AxiosService.delete('/users/' + id,{ headers:{'access-token':state.user.token}})
            console.log('respuesta',response)
            
            if (response.status === 204) {                
                dispatch(listUsers())
                                
            }
        } catch(e){
            console.log('error')
        }        
    }
}