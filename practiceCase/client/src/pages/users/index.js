import React, { useEffect, useState } from 'react'
import { NavBar, Modal, UserForm } from '../../components'
import { 
    UserItem, 
    UserList, 
    UserName, 
    UserEmail,
    /*UserImage,*/
    UserType,
    UserButtons,
    ButtonAdd
} from './style'
import { useSelector, useDispatch } from 'react-redux'
import edit from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.png';
import { listUsers, addUsers, editUsers, daleteUser } from '../../store/actions/users.actions';
import { CLEAR_USERS } from '../../store/constants';

const Users = () => {
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch()  
    const [modal, setModal] = useState(false) 
    const [saved, setSaved] = useState(false)
    const [modalData, setData] = useState(null)
    useEffect(()=>{    
        if(!user.usersLoaded){
            dispatch(listUsers())
        }
    },[dispatch,user.usersLoaded])  
    useEffect(() => {
        return () => {          
            console.log('call clear users')
            dispatch({type: CLEAR_USERS})
        };
    }, [dispatch]); 
    const modalControl = (state=false) => {        
        setModal(state)
        if(state){
            setSaved(false)
        }
    }
    const deleteUser = (id, name) =>{
        if (window.confirm('Confirma que deseas borrar al usuario ' +name)) {
            dispatch(daleteUser(id))
        }
    }
    const editUser = (data) =>{
        const info = {
            name: data.name,
            email: data.email,
            UserTypeId: data.UserType.id,
            id: data.id
        }        
        setData(info)
        setModal(true)
    }
    const makeAction = (data) => {        
        if(modalData){
            dispatch(editUsers(data))
            setSaved(true)
            setModal(false)
            setData(null)
        } else{
            dispatch(addUsers(data))
            setSaved(true)
            setModal(false)
        }
    }
    return (
        <React.Fragment>
            <NavBar />
            {
                    user.permissions.users.includes("create") &&                     
                    <ButtonAdd onClick={()=>modalControl(true)}>
                        +
                    </ButtonAdd>
                }
            <UserList>
                <UserItem>
                    {/*<UserImage src="" alt="imagen" />*/}
                    <UserName>
                        Nombre
                    </UserName>
                    <UserEmail>
                        Email
                    </UserEmail>
                    <UserType>
                        Tipo de usuario
                    </UserType>
                    <UserButtons>
                        Acciones
                    </UserButtons>
                </UserItem>
                {user.usersList.map(item=>
                    <UserItem key={item.id}>
                        {/*<UserImage src="" alt="imagen" />*/}
                        <UserName>
                            {item.name}
                        </UserName>
                        <UserEmail>
                            {item.email}
                        </UserEmail>
                        <UserType>
                            {item.UserType.name}
                        </UserType>
                        <UserButtons>
                            {user.permissions.users.includes('delete') &&
                                <button onClick={()=>{deleteUser(item.id,item.name)}} className="delete">
                                    <img src={deleteIcon} alt='deleteIcon' />                                
                                </button>
                            }
                            {user.permissions.users.includes('update') &&
                                <button onClick={()=>{editUser(item)}}>
                                    <img src={edit} alt='edit' />                                
                                </button>
                            }
                        </UserButtons>
                    </UserItem>   
                )}         
            </UserList>   
            <Modal  isShow={modal} title={modalData ? 'Editar usuario ' + modalData.name : 'Agregar usuario nuevo' } hide={()=>{modalControl(false); setData(null)}} saved={saved}>                
                <UserForm data={modalData} callback={makeAction} buttonText={modalData ? "Actualizar" : "Guardar"}/>
            </Modal>           
        </React.Fragment>
    )
}

export default Users