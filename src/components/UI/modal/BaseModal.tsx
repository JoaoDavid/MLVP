import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface BaseModalProps {
    title: string;
    children?: React.ReactNode;
    /*
    receber aqui as variaveis para fazer binding com os inputs que meter no modal
     */
    handleClose: () => void;
    handleShow: () => void;
    show: boolean;
}

const BaseModal = (props: BaseModalProps) => {
    return (
        <>
            <Modal animation={false} size="lg" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BaseModal;
