import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarHolder, LogOut } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/actions/users.actions';

const navItems ={
    books: {
        route: '/home',
        name: 'Libros'
    },
    users: {
        route: '/users',
        name: 'Usuarios'
    },
}

const NavBar = () => {    
    const userData = useSelector(state=>state.user) 
    const dispatch = useDispatch()   
    return(
        <NavBarHolder>
            {userData.permissions && Object.keys(userData.permissions).map((item)=>                
                <NavLink key={item} to={navItems[item].route} activeClassName='active'>{navItems[item].name}</NavLink>                         
            )}
            <LogOut onClick={()=>{dispatch(logOut())}} activeClassName='none'>
                <NavLink to='/'>
                    Salir
                </NavLink>
            </LogOut>            
        </NavBarHolder> 
    )
}

export default NavBar;