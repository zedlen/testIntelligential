import React, { useEffect, useState } from 'react'
import { NavBar, Row, Modal, BookForm } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonEditBook, BookContainer, BookInfo, BookTitle, BookImage, BookData, ButtonRequestBook, ButtonDeleteBook } from './style';
import edit from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.png';
import { loadBook, updateBook, deleteBook, clearBook } from '../../store/actions/books.actions';
import { withRouter } from 'react-router-dom';
import defaultImage from '../../assets/default_book.png'
import { requestLoan } from '../../store/actions/loans.actions';

const Book = ({history}) => {
    const {user, books} = useSelector(state=>state);
    const [modal, setModal] = useState(false)
    const [saved, setSaved] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{        
        if(!books.bookDetail.loaded){
            console.log('call load book')
            dispatch(loadBook(history.location.pathname.split('/')[2]))
        }  
    },[dispatch, books.bookDetail.loaded, history.location.pathname])
    useEffect(() => {
        return () => {          
            console.log('call clear')
            dispatch(clearBook())
        };
    }, [dispatch]);
    const modalControl = (state=false) => {        
        setModal(state)
        if(state){
            setSaved(false)
        }
    }
    const saveData = (values) => {
        delete values.createdAt
        delete values.updatedAt
        delete values.id
        delete values.loaded
        console.log(values)
        dispatch(updateBook(books.bookDetail.id,values))
        modalControl(false)
        setSaved(true)
    }

    const delBook = () => {
        dispatch(deleteBook(history.location.pathname.split('/')[2],history))
    }

    const requestBookCall = () => {
        var days = window.prompt('¿Por cuantos dias requieres el libro? Por default son 5 dias.', 5);
        const data={
            book_id: books.bookDetail.id,
            loan_days: days
        }
        dispatch(requestLoan(data, history))
    }
    return(
        <React.Fragment>
            <NavBar />
            { !books.bookDetail.loaded && <div>Cargando</div>}
            {
                user.permissions.books.includes("update") &&                     
                <ButtonEditBook onClick={()=>{modalControl(true)}}>
                    <img src={edit} alt="editar" style={{width:'100%'}}/>
                </ButtonEditBook>
            }
            {
                user.permissions.books.includes("update") &&                     
                <ButtonDeleteBook onClick={()=>{delBook()}}>
                    <img src={deleteIcon} alt="borrar" style={{width:'100%'}}/>
                </ButtonDeleteBook>
            }
            <BookContainer>
                <BookImage src={defaultImage} alt="libro" />
                <BookInfo>
                    <BookTitle>{books.bookDetail.name}</BookTitle>
                    <Row>                        
                        <BookData>{books.bookDetail.author}</BookData>
                        <BookData>{books.bookDetail.publishDate}</BookData>
                    </Row>                    
                    <Row>                        
                        <BookData complete>{books.bookDetail.editorial}</BookData>                        
                    </Row> 
                    <Row>                        
                        <BookData complete>{books.bookDetail.description}</BookData>                        
                    </Row>   
                    {user.permissions.books.includes("borrow") && books.bookDetail.availableCopies > 0&& 
                    <ButtonRequestBook onClick={requestBookCall}>
                        Solicitar prestamo
                    </ButtonRequestBook>}
                </BookInfo>
            </BookContainer>  
            <Modal  isShow={modal} title={'Editar libro' + books.bookDetail.name} hide={()=>modalControl(false)} saved={saved}>
                <BookForm data={books.bookDetail} callback={saveData} buttonText="Actualizar"/>
            </Modal>         
        </React.Fragment>
    )
}

export default withRouter(Book)