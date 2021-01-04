import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BaseModalProps {

}

type BaseModalState = {

};

class BaseModalClass extends React.Component<BaseModalProps, BaseModalState> {

    state = {
        show : false
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}


export default BaseModalClass;
