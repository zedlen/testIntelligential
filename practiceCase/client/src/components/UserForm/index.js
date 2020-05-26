import React, { useState } from 'react';
import { FormContainer, FormElement, Input, Button } from './style';

const UserForm = ({data = null, didChange,buttonText, callback}) => {

    const [values, setValues]= useState(data?data:{
        name:'',
        email:'',
        password:'',
        UserTypeId:0
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
                <label htmlFor="email">Email</label>
                <Input onChange={onChange} name='email' id="email" placeholder='Email' value={values.email}/>
                {(values.password || values.password === '' ) && <><label htmlFor="password">Contraseña</label>
                <Input onChange={onChange} type="password" name='password' id="password" placeholder='Contraseña' value={values.password}/></>}
                <label htmlFor="UserTypeId">Tipo de Usuario</label>
                <Input onChange={onChange} name='UserTypeId' id="UserTypeId" placeholder='Tipo de Usuario' value={values.UserTypeId}/>                
                <Button onClick={()=>{callback(values)}}>
                    {buttonText}
                </Button>
            </FormElement>
        </FormContainer>
    )
}

export default UserForm