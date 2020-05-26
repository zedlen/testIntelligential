import React, { useEffect, useState } from 'react'
import { NavBar, Row, Modal, BookForm } from '../../components'
import { 
    HomeHolder, 
    ButtonAddBook, 
    BookCard, 
    BookImage, 
    BookTitle,
    BookAuthor
} from './style'
import { useSelector, useDispatch } from 'react-redux'
import defaultImage from '../../assets/default_book.png'
import { loadBooks } from '../../store/actions/books.actions'
import { withRouter } from 'react-router-dom'
import { BOOK_SELECTED, CLEAR_BOOKS } from '../../store/constants'
import { saveBook } from '../../store/actions/books.actions';

const Home = ({ history }) => {
    const {user, books} = useSelector(state=>state);

    const [modal, setModal] = useState(false)
    const [saved, setSaved] = useState(false)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if (!books.loaded) {
            dispatch(loadBooks())   
        }       
    },[books.loaded, dispatch])
    useEffect(() => {
        return () => {          
            console.log('call clear home')
            dispatch({type: CLEAR_BOOKS})
        };
    }, [dispatch]);
    const goToBook = (book) => { 
        dispatch({ type: BOOK_SELECTED, data: book})          
        history.push('home/'+book.id);
    }
    const modalControl = (state=false) => {        
        setModal(state)
        if(state){
            setSaved(false)
        }
    }
    const saveData = (values) => {
        dispatch(saveBook(values))
        modalControl(false)
        setSaved(true)
    }
    return(
        <React.Fragment>
            <NavBar />
            <HomeHolder>
                {
                    user.permissions.books.includes("create") &&                     
                    <ButtonAddBook onClick={()=>modalControl(true)}>
                        +
                    </ButtonAddBook>
                }
                <Row>
                    {books.books.map(book=>                    
                        <BookCard key={book.id} onClick={()=>{goToBook(book)}} >
                            <BookImage src={defaultImage} alt='book' />
                            <BookTitle>
                                {book.name}
                            </BookTitle>
                            <BookAuthor>
                                {book.author}
                            </BookAuthor>
                        </BookCard>
                    )}
                </Row>
            </HomeHolder>
            <Modal  isShow={modal} title={'Agregar nuevo libro'} hide={()=>modalControl(false)} saved={saved}>
                <BookForm data={books.bookDetail} callback={saveData} buttonText="Guardar"/>
            </Modal>   
        </React.Fragment>
    )
}

export default withRouter(Home);