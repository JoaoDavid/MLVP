import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KerasClassifierModel} from "./KerasClassifierModel";
import Canvas from "../../../UI/canvas/Canvas";
import classes from "../../../../app/App.module.css";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import SideBar from "../../../UI/side-bar/SideBar";
import {DragEvent} from "react";
import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import Row from "react-bootstrap/Row";
import {NEURAL_NETWORK_CATEGORIES} from "../../Config";
import {Button} from "react-bootstrap";


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
    hideCanvas: (value: boolean) => void;
}

const KerasClassifierModal = (props: KerasClassifierModalProps) => {
    const onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("agfasg");
        try {
            const inJSON = JSON.parse(data);
            // data = {"codeName":"...","name":"..."}
            const factory = props.node.getEngine().getNodeFactories().getFactory(inJSON.codeName);
            const node = factory.generateModel({}) as BaseNodeModel;
            let point = props.node.getEngine().getRelativeMousePoint(event);
            node.setPosition(point);
            // node.setTitle(node.getTitle() + " " + ++this.generated_nodes_counter);
            props.node.getEngine().getModel().addNode(node);
            props.node.getEngine().repaintCanvas();
        } catch (e) {
            console.log(e);
        }
    }

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
                            <SideBar format={"agfasg"} categories={NEURAL_NETWORK_CATEGORIES}/>
                            <Canvas engine={props.node.getEngine()} onDropCanvas={onDropCanvas}/>
                        </div>
                    </div>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default KerasClassifierModal;
