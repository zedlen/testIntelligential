import React, { useEffect } from 'react';
import { NavBar, Row } from '../../components';
import { Header, LoansCol, LoanStatusButton } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { loadLoans, acceptLoan, rejectLoan, endLoan} from '../../store/actions/loans.actions';
import { CLEAR_LOANS } from '../../store/constants';

const status_labels={
    IN_LOAN:'En prestamo',
    PENDING:'Pendiente',
    REJECTED:'Rechazada',
    RETURNED:'Libro regresado'
}

const Loans = () => {
    const loans = useSelector(state=>state.loans)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!loans.loaded) {
            dispatch(loadLoans())
        }
        
    },[dispatch,loans.loaded])
    useEffect(() => {
        return () => {          
            console.log('call clear loans')
            dispatch({type: CLEAR_LOANS})
        };
    }, [dispatch]);
    const acceptLoanCall = (loan) => {
        if (window.confirm('Aceptar prestamo por '+loan.days+' del libro '+loan.book_name+' para '+loan.user_name)) {
            dispatch(acceptLoan({loan_id:loan.id}))
        }
    };
    const rejectLoanCall = (loan) => {
        if (window.confirm('Rechazar prestamo por '+loan.days+' del libro '+loan.book_name+' para '+loan.user_name)) {
            dispatch(rejectLoan({loan_id:loan.id}))
        }
    };
    const returnBookCall = (loan) => {
        if (window.confirm('Confirmar devolucion de libro por parte del usuario')) {
            dispatch(endLoan({loan_id:loan.id, book_id: loan.book_id}))
        }
    }
    return(
        <React.Fragment>
            <NavBar />
            <Row>
                <Header>ID Solicitud</Header>
                <Header>Libro</Header>
                <Header>Usuario</Header>
                <Header>Fecha de solicitud</Header>
                <Header>Dias</Header>
                <Header>Estatus</Header>
                <Header>&nbsp;</Header>
            </Row>
            {loans.loans.map(loan=>
            <Row key={loan.id}>
                <LoansCol>{loan.id}</LoansCol>
                <LoansCol>{loan.book_name}</LoansCol>
                <LoansCol>{loan.user_name}</LoansCol>
                <LoansCol>{loan.book_loan_start}</LoansCol>
                <LoansCol>{loan.loan_days}</LoansCol>
                <LoansCol>{status_labels[loan.status]}</LoansCol>
                <LoansCol>
                    {loan.status === 'PENDING' && (
                    <>
                        <LoanStatusButton onClick={()=>acceptLoanCall(loan)}>
                            Acceptar
                        </LoanStatusButton>
                        <LoanStatusButton onClick={()=>rejectLoanCall(loan)} reject>
                            Rechazar
                        </LoanStatusButton>
                    </>  
                    )}
                    {loan.status === 'IN_LOAN' && (
                    <>
                        <LoanStatusButton onClick={()=>returnBookCall(loan)}>
                            Devolución
                        </LoanStatusButton>                        
                    </>  
                    )}
                </LoansCol>
            </Row>)}
            
        </React.Fragment>
    )
}

export default Loans