import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';
import classes from '../../UI/modal/BaseModal.module.css';

interface AppModalProps {
    title: string;
    footer?: string;
    children?: React.ReactNode;
}

const AppModal = (props: AppModalProps) => {
    return (
        <>
            <Modal.Header closeButton>
                <div style={{height: "30px"}}>
                    <Modal.Title className={classes.Title}>{props.title}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <ModalFooter>{props.footer}</ModalFooter>
        </>
    )
}

export default AppModal;
