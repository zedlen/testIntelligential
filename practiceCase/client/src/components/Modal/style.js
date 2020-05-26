import styled from "styled-components";

export const ModalBackground= styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const ModalBody= styled.div`
    background: white;
    width: 80%;
    height: 60%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`;

export const ButtonCloseModal = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    overflow: hidden;
`;

export const ModalTitle = styled.h3`
    width: 100%;
    text-align: center;
`;