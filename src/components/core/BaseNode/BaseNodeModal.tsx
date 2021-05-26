import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';
import InputTitle from "../../UI/modal/input-title/InputTitle";
import classes from '../../UI/modal/BaseModal.module.css';

interface BaseNodeModalProps {
    title: string;
    footer: string;
    children?: React.ReactNode;
    saveTitle: (title: string) => void;
}

const BaseNodeModal = (props: BaseNodeModalProps) => {
    const [title, setTitle] = useState(props.title);
    const [isEditing, setEdit] = useState(false);

    const saveTitle = (title: string) => {
        setTitle(title);
        props.saveTitle(title);
    }

    const startEditingText = () => {
        setEdit(true);
    }

    const finishEditingText = () => {
        setEdit(false);
        saveTitle(title);
    }

    let currTitleElement;

    if (isEditing) {
        currTitleElement = (<InputTitle title={title} saveTitle={saveTitle}
                                        finishEditingText={finishEditingText}/>);
    } else {
        currTitleElement = (<Modal.Title className={classes.Title} onClick={startEditingText}>{title}</Modal.Title>);

    }

    return (
        <>
            <Modal.Header closeButton>
                <div style={{height: "30px"}} onClick={startEditingText}>
                    {currTitleElement}
                </div>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <ModalFooter>{props.footer}</ModalFooter>
        </>
    )
}

export default BaseNodeModal;
