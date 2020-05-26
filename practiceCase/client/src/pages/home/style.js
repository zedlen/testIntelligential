import styled from "styled-components";

export const HomeHolder = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ButtonAddBook = styled.button`
    padding: .5rem .8rem;
    background: #9b0063;
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5rem;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`;

export const BookCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: calc( 25% - 1rem);
    padding: .2rem .21rem;
    margin: .5rem .21rem;
    border: 1px solid #fafafa;
    box-shadow: 0 0 2px #afafaf;
    border-radius: 5px;    
    @media only screen and (max-width: 500px) {
        width: calc( 50% - 1rem);
    }
    @media only screen and (max-width: 920px) {
        width: calc( 33% - 1rem);
    }
    &:hover{
        box-shadow: 0 0 10px #9b0063;
        cursor: pointer;
    }
`;

export const BookImage = styled.img`
    width: 100%;
    max-height: 30rem;
    pointer-events: none;
`;

export const BookTitle = styled.h2`
    width: 100%;
    text-align: center;
    color: #2b2b2b;
    margin: 0;
    pointer-events: none;
`;

export const BookAuthor = styled.h4`
    width: 100%;
    text-align: center;
    color: #7e7e7e;
    margin: .2rem;
    pointer-events: none;
`;