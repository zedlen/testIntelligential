import React, { useState } from 'react';
import { FormContainer, FormElement, Input, Button } from './style';

const BookForm = ({data = null, didChange,buttonText, callback}) => {

    const [values, setValues]= useState(data?data:{
        name:'',
        author:'',
        publishDate:'',
        availableCopies:'',
        description:'',
    })
    const onChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })   
        didChange()     
    }
    return(
        <FormContainer>
            <FormElement>
                <label htmlFor="name">Nombre</label>
                <Input onChange={onChange} name='name' id="name" placeholder='Nombre' value={values.name}/>
                <label htmlFor="author">Autor</label>
                <Input onChange={onChange} name='author' id="author" placeholder='Autor' value={values.author}/>
                <label htmlFor="editorial">Editorial</label>
                <Input onChange={onChange} name='editorial' id="editorial" placeholder='Editorial' value={values.editorial}/>
                <label htmlFor="publishDate">Fecha de publicación</label>
                <Input onChange={onChange} name='publishDate' id="publishDate" placeholder='Fecha de publicación' value={values.publishDate} type="date"/>                
                <label htmlFor="availableCopies">Copias disponible</label>
                <Input onChange={onChange} name='availableCopies' id="availableCopies" placeholder='Fecha de publicación' value={values.availableCopies} type="number"/>
                <label htmlFor="description">Descripción</label>
                <Input onChange={onChange} name='description' id="description" placeholder='Descripción' value={values.description}/>                
                <Button onClick={()=>{callback(values)}}>
                    {buttonText}
                </Button>
            </FormElement>
        </FormContainer>
    )
}

export default BookForm