import styled from 'styled-components';

export const FormContainer = styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const FormElement = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
`;

export const Input = styled.input`
    width: 60%;
    padding: .5rem .4rem;
    font-size: 1.2rem;
    margin: 1.2rem .2rem;
    background: #fafafa;
    border: #afafaf 1px solid;
    border-radius: 5px;    
    @media only screen and (max-width: 600px) {
        width: 85%;        
    }
`;

export const Button = styled.button`
    width: 40%;
    padding: .5rem .4rem;
    font-size: 1.2rem;
    margin: 1.2rem .2rem;
    background: #9b0063;    
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 5px 1px #9b0063;
    }
    @media only screen and (max-width: 600px) {
        width: 85%;        
    }
`;