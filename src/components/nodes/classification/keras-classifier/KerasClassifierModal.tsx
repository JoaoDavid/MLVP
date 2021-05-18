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


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
    engine: DiagramEngine
}

const KerasClassifierModal = (props: KerasClassifierModalProps) => {
    const onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("agfasg");
        try {
            const inJSON = JSON.parse(data);
            // data = {"codeName":"...","name":"..."}
            const factory = props.engine.getNodeFactories().getFactory(inJSON.codeName);
            const node = factory.generateModel({}) as BaseNodeModel;
            let point = props.engine.getRelativeMousePoint(event);
            node.setPosition(point);
            // node.setTitle(node.getTitle() + " " + ++this.generated_nodes_counter);
            props.engine.getModel().addNode(node);
            props.engine.repaintCanvas();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Form>
            <Form.Group>
                <Row>
                    <div className={classes.FrontPage}>
                        <div className={classes.Container}>
                            <SideBar format={"agfasg"} categories={NEURAL_NETWORK_CATEGORIES}/>
                            <Canvas engine={props.engine} onDropCanvas={onDropCanvas}/>
                        </div>
                    </div>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default KerasClassifierModal;
