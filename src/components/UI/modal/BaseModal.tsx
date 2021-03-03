import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';
import InputTitle from "./input-title/InputTitle";
import classes from './BaseModal.module.css';

interface BaseModalProps {
    title: string;
    footer: string;
    children?: React.ReactNode;
    /*
    receber aqui as variaveis para fazer binding com os inputs que meter no modal
     */
    handleClose: () => void;
    handleShow: () => void;
    show: boolean;
    saveTitle: (title: string) => void;
}

const BaseModal = (props: BaseModalProps) => {
    const [title, setTitle] = useState(props.title);
    const [isEditing, setEdit] = useState(false);

    const changeTextHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setTitle(event.target.value);
        }
    }

    const startEditingText = () => {
        setEdit(true);
    }

    const finishEditingText = () => {
        setEdit(false);
        props.saveTitle(title);
    }

    let currTitleElement;

    if (isEditing) {
        currTitleElement = (<InputTitle title={props.title} changeTextHandler={changeTextHandler} finishEditingText={finishEditingText}/>);
    } else {
        currTitleElement = (<Modal.Title className={classes.Title} onClick={startEditingText}>{title}</Modal.Title>);

    }

    return (
        <>
            <Modal animation={false} size="lg" show={props.show} onHide={()=>{props.handleClose();finishEditingText()}}>
                <Modal.Header closeButton>
                    <div onClick={startEditingText}>
                        {currTitleElement}
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <ModalFooter>{props.footer}</ModalFooter>
            </Modal>
        </>
    )
}

export default BaseModal;
