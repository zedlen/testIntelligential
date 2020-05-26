import AxiosService from "../../services/api";
import { LOANS_LOADED, USER_LOANS_LOADED } from "../constants";

export function loadLoans(){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.get('/loans',{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 200) {                
                dispatch({type: LOANS_LOADED, data: responseLoans.data} )      
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function requestLoan(data, history) {
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.post('/borrow',data,{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 200) {                
                alert('Solicitud realizada correctamente')
                history.replace('/home')
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function rejectLoan(data) {
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.put('/rejectLoan',data,{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 203) {
                dispatch(loadLoans())
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function acceptLoan(data) {
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.put('/acceptLoan',data,{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 203) {
                dispatch(loadLoans())
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function endLoan(data) {
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.post('/returnBook',data,{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 203) {
                dispatch(loadLoans())
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function loadUserLoanLoans() {
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseLoans = await AxiosService.get('/loans/user',{ headers:{'access-token':state.user.token}})
            if (responseLoans.status === 200) {
                dispatch({type: USER_LOANS_LOADED, data: responseLoans.data})
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}