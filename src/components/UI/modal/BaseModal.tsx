import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';

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
}

const BaseModal = (props: BaseModalProps) => {
    const [title, setTitle] = useState("g");
    const [isEditing, setEdit] = useState(false);

    const changeTextHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const startEditingText = () => {
        setEdit(true);
    }

    const finishEditingText = () => {
        setEdit(false);
    }

    let hiddenStyle = {display: "none"};
    let modalTitle = (<Modal.Title onClick={startEditingText}>{title}</Modal.Title>);
    let inputTitle = (<input onChange={changeTextHandler} value={title} onBlur={finishEditingText} style={hiddenStyle}/>);

    if (isEditing) {
        modalTitle = (<Modal.Title onClick={startEditingText} style={hiddenStyle}>{title}</Modal.Title>);
        inputTitle = (<input onChange={changeTextHandler} value={title} onBlur={finishEditingText}/>);
    }



    return (
        <>
            <Modal animation={false} size="lg" show={props.show} onHide={()=>{props.handleClose();finishEditingText()}}>
                <Modal.Header closeButton>
                    {modalTitle}
                    {inputTitle}
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
