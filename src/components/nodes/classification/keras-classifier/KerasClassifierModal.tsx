import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KerasClassifierModel} from "./KerasClassifierModel";
import Canvas from "../../../UI/canvas/Canvas";
import classes from "./Keras.module.css";
import SideBar from "../../../UI/side-bar/SideBar";
import Row from "react-bootstrap/Row";
import {NEURAL_NETWORK_CATEGORIES} from "../../Config";


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
}

const KerasClassifierModal = (props: KerasClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
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
