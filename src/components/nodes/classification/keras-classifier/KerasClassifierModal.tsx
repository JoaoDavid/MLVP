import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KerasClassifierModel} from "./KerasClassifierModel";
import Canvas from "../../../UI/canvas/Canvas";
import classes from "./Keras.module.css";
import SideBar from "../../../UI/side-bar/SideBar";
import Row from "react-bootstrap/Row";
import {NEURAL_NETWORK_CATEGORIES} from "../../Config";
import {Button} from "react-bootstrap";


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
    hideCanvas: (value: boolean) => void;
}

const KerasClassifierModal = (props: KerasClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Button onClick={() => props.hideCanvas(true)} variant="primary" size="lg">
                        Primary button
                    </Button>
                </Row>
                <Row>
                    <div className={classes.FrontPage}>
                        <div className={classes.Container}>
                            <SideBar format={props.node.getDragDropFormat()} categories={NEURAL_NETWORK_CATEGORIES}/>
                            <Canvas engine={props.node.getEngine()} onDropCanvas={props.node.onDropCanvas}/>
                        </div>
                    </div>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default KerasClassifierModal;
