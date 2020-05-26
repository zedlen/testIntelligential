import React, {useEffect, useState, cloneElement, Children, isValidElement } from 'react';
import { 
    ModalBackground,
    ModalBody,
    ButtonCloseModal,
    ModalTitle
} from './style';

const Modal = ({isShow, hide, children, title, saved}) => {

    useEffect(()=>{
        /*if (isShow) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
            document.getElementsByTagName('body')[0].scrollTo(0,0)
        } else {
            document.getElementsByTagName('body')[0].style.overflow = 'auto'
        }*/
    })
    const [change, setChange] = useState(false)
    if(!isShow){
        return null;
    }    
    const stopCallBack = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const didChange = () =>{
        console.log('called')
        setChange(true)
    }
    const closeModal = () => {
        if (change && !saved) {
            const close = window.confirm('Los cambios realizados no se guardaran')
            if(close){
                hide()
            }
        } else {
            hide()
        }
    }

    const childrenWithProps = Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a TS error too.
        if (isValidElement(child)) {
          return cloneElement(child, {didChange})
        }
  
        return child;
      });
    return(
        <ModalBackground onClick={closeModal}>            
            <ModalBody onClick={stopCallBack}>
                <ButtonCloseModal onClick={closeModal} >
                     x
                </ButtonCloseModal>
                <ModalTitle>
                    {title}
                </ModalTitle>
                {childrenWithProps}
            </ModalBody>
        </ModalBackground>
    )
}

export default Modal