import React, { useEffect } from 'react';
import { NavBar, Row } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileHolder, InfoHolder, LoansHolder, UserName, UserEmail } from './style';
import { Header, LoansCol } from '../loans/style';
import { loadUserLoanLoans } from '../../store/actions/loans.actions'
import { CLEAR_LOANS } from '../../store/constants';

const status_labels={
    IN_LOAN:'En prestamo',
    PENDING:'Pendiente',
    REJECTED:'Rechazada',
    RETURNED:'Libro regresado'
}
const Profile = () => {
    const {user,loans} = useSelector(state=>state)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!loans.userLoansLoaded) {
            dispatch(loadUserLoanLoans())   
        }
    },[dispatch,loans.userLoansLoaded])
    useEffect(() => {
        return () => {          
            console.log('call clear profile')
            dispatch({type: CLEAR_LOANS})
        };
    }, [dispatch]);
    return(
        <div>
            <NavBar />
            <ProfileHolder>
                <InfoHolder>
                    <UserName>
                        {user.name}
                    </UserName>
                    <UserEmail>{user.email}</UserEmail>
                </InfoHolder>
                <LoansHolder>                    
                    <Row>
                        <Header>ID Solicitud</Header>
                        <Header>Libro</Header>
                        <Header>Usuario</Header>
                        <Header>Fecha de solicitud</Header>
                        <Header>Dias</Header>
                        <Header>Estatus</Header>
                    </Row>
                    {loans.userLoans.map(loan=>
                    <Row key={loan.id}>
                        <LoansCol>{loan.id}</LoansCol>
                        <LoansCol>{loan.book_name}</LoansCol>
                        <LoansCol>{loan.user_name}</LoansCol>
                        <LoansCol>{loan.book_loan_start}</LoansCol>
                        <LoansCol>{loan.loan_days}</LoansCol>
                        <LoansCol>{status_labels[loan.status]}</LoansCol>                        
                    </Row>)}
                </LoansHolder>
            </ProfileHolder>
        </div>
    )
}

export default Profile