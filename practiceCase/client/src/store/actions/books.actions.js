import AxiosService from "../../services/api";
import { BOOKS_LOADES, BOOK_LOADED, BOOK_UPDATED, BOOK_CLEAR_SELECTED } from "../constants";

export function loadBooks(){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseBoooks = await AxiosService.get('/books',{ headers:{'access-token':state.user.token}})
            if (responseBoooks.status === 200) {
                dispatch({type: BOOKS_LOADES, data: responseBoooks.data})
            }
        } catch(e){
            console.log('error')
        }        
    }
}

export function loadBook(id){
    return async function (dispatch, getState){
        try{
            const state = getState()
            console.log(state.books)
            if (!state.books.bookDetail.loaded) {
                const responseBoooks = await AxiosService.get('/books/' + id,{ headers:{'access-token':state.user.token}})
                if (responseBoooks.status === 200) {
                    dispatch({type: BOOK_LOADED, data: responseBoooks.data})
                }
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function updateBook(id, data){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseBoooks = await AxiosService.put('/books/' + id,data,{ headers:{'access-token':state.user.token}})
            if (responseBoooks.status === 204) {
                dispatch({type: BOOK_UPDATED, data: data})  
                dispatch(loadBooks())           
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function clearBook() {
    return async function (dispatch){
        try{
            dispatch({type: BOOK_CLEAR_SELECTED})             
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function saveBook( data){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseBoooks = await AxiosService.post('/books',data,{ headers:{'access-token':state.user.token}})
            if (responseBoooks.status === 200) {                
                dispatch(loadBooks())           
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}

export function deleteBook( id, history){
    return async function (dispatch, getState){
        try{
            const state = getState()
            const responseBoooks = await AxiosService.delete('/books/' + id,{ headers:{'access-token':state.user.token}})
            if (responseBoooks.status === 204) {                
                dispatch(loadBooks())        
                history.replace('/home')   
            }
        } catch(e){
            console.log('error', e)
        }        
    }
}