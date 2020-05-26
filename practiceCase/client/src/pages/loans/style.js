import styled from 'styled-components'

export const Header = styled.div`
    flex: 1;
    font-weight: bold;
    text-align: center;
`;

export const LoansCol = styled.div`
    flex: 1;    
    text-align: center;
    border: 1px solid #fafafa;
`;

export const LoanStatusButton = styled.button`
    border: none;
    cursor: pointer;
    background: ${({reject}) => reject ? 'red':'green'};
    text-align: center;
    border: 1px solid #fafafa;
    width: 5rem;
    height: 2rem;
`;