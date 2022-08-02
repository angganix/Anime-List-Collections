import React from 'react'
import styled from '@emotion/styled'

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
`

const ModalBackdrop = styled.div`
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #33333388;
`

const ModalContent = styled.div`
    padding: 1rem;
    background: white;
    min-width: 576px;
    max-width: 576px;
    z-index: 1001;
    overflow-y: auto;
    box-shadow: 0px 0px 12px #00000022;
    border-radius: 0.5rem;
    @media (max-width: 576px) {
        min-width: 85%;
        max-width: 85%;
    }
`

const Modal = ({ children, show, onHide }) => {
    if (show) {
        return (
            <ModalWrapper>
                <ModalBackdrop onClick={onHide} />
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalWrapper>
        )
    }

    return null;
}

export default Modal