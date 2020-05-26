import styled from 'styled-components'

export const ButtonEditBook = styled.button`
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
    pointer-events: auto;
`;


export const BookContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    width: calc( 100% - 1rem);
    padding: .2rem .21rem;
    margin: .5rem .21rem;
    border: 1px solid #fafafa;
    box-shadow: 0 0 2px #afafaf;
    border-radius: 5px;    
   
`;

export const BookImage = styled.img`
    max-width: 50%;
    max-height: 30rem;    
`;

export const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
`;

export const BookTitle = styled.h2`
    width: 100%;
    text-align: center;
    color: #2b2b2b;
    margin: 0;  
`;

export const BookData = styled.h4`
    width: ${({complete}) => complete ? '100%':'45%'};
    text-align: center;
    color: #7e7e7e;
    margin: .2rem;
`;


export const ButtonRequestBook = styled.button`
    padding: .5rem .8rem;
    background: #9b0063;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;    
`;

export const ButtonDeleteBook = styled.button`
  padding: .5rem .8rem;
    background: transparent;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;  
    width: 3rem;
    height: 3rem;  
    position: absolute;
    top: 50px;
    right: 10px;
`;
