import styled from "styled-components";

export const UserList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: calc( 100% - 1rem);
    padding: .2rem .21rem;
    margin: .5rem .21rem;
`;

export const UserItem = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #afafaf;
    justify-items: center;
    align-items: center;
    border-radius: 5px;   
    width: 90%; 
`;

export const UserImage = styled.img`
    flex: 1;
`;

export const UserName = styled.div`
    flex: 1;
`;

export const UserEmail = styled.div`
    flex: 1;
`;

export const UserType = styled.div`
    flex: 1;
`;

export const UserButtons = styled.div`
    flex: 1;
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    align-items: center;
    &>button{
        width: 2rem;
        height: 2rem;
        border-radius:1.5rem;
        margin: .5rem;
        padding: .3rem;
        border: none;
        background: #9b0063;
        cursor: pointer;
        &.delete{
            background: lightgray;
        }
        &>img{
            height: 100%;
        }
    }
`;

export const ButtonAdd = styled.button`
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
