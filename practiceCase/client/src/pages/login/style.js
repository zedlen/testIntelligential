import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('https://images5.alphacoders.com/394/394862.jpg');
    background-size: 100% 100%;
`;

export const LoginForm = styled.form`
    width: 50%;
    height: 50%;
    background: #000;
    border: #afafaf 1px solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        width: 95%;
        height: 60%;
    }
`;

export const LoginInput = styled.input`
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

export const LoginButton = styled.button`
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