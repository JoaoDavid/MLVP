import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form';

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
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BaseModal;