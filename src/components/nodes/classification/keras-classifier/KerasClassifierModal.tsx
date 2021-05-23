import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KerasClassifierModel} from "./KerasClassifierModel";
import Canvas from "../../../UI/canvas/Canvas";
import classes from "./Keras.module.css";
import SideBar from "../../../UI/side-bar/SideBar";
import Row from "react-bootstrap/Row";
import {NEURAL_NETWORK_CATEGORIES} from "../../Config";
import BottomNav from "../../../UI/bottom-nav/BottomNav";
import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";
import {MyDiagramModel} from "../../../../app/diagram/MyDiagramModel";
import {useState} from "react";
import {TypeCheckResponse} from "../../../../app/typecheck/TypeChecker";


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
    // unsatNodeAssertions: Map<BaseNodeModel, string[]>;
    // allNodeAssertions: Map<BaseNodeModel, string[]>;
    // allLinkAssertions: Map<DefaultLinkModel, string[]>,
    // log: string[];
}

const KerasClassifierModal = (props: KerasClassifierModalProps) => {

    const [allNodeAssertions, setAllNodeAssertions] = useState(new Map());
    const [allLinkAssertions, setAllLinkAssertions] = useState(new Map());
    const [unsatNodeAssertions, setUnsatNodeAssertions] = useState(new Map());

    const processNodeAssertions = (mapNodeAssertions) => {
        const map = new Map<BaseNodeModel, string[]>();

        for (let k of Object.keys(mapNodeAssertions)) {
            const node = props.node.getEngine().getModel().getNode(k) as BaseNodeModel;
            map.set(node, mapNodeAssertions[k]);
        }
        return map;
    }

    const processLinkAssertions = (typeCheckResponse: TypeCheckResponse) => {
        const map = new Map<DefaultLinkModel, string[]>();

        for (let k of Object.keys(typeCheckResponse.linkAssertions)) {
            const link = props.node.getEngine().getModel().getLink(k) as DefaultLinkModel;
            console.log(link)
            map.set(link, typeCheckResponse.linkAssertions[k]);
        }
        return map;
    }

    const registerListeners = (model: MyDiagramModel) => {
        model.registerListener({
            nodeUpdated: (event) => {
                console.log("event: nodeUpdated");
                console.log(event);
                props.node.getTypeChecker().requestTypeCheck();
            },
            typeCheckResponse: (event) => {
                console.log("event: typeCheckResponse");
                console.log(event);
                setAllNodeAssertions(processNodeAssertions(event.typeCheckResponse.nodeAssertions));
                setAllLinkAssertions(processLinkAssertions(event.typeCheckResponse));
                setUnsatNodeAssertions(processNodeAssertions(event.typeCheckResponse.unsatNodeAssertions));
                // props.node.getEngine().repaintCanvas();
            },
        });
    }

    registerListeners(props.node.getModel());

    return (
        <Form>
            <Form.Group>
                <Row>
                    <div className={classes.FrontPage}>
                        <div className={classes.Container}>
                            <SideBar format={props.node.getDragDropFormat()} categories={NEURAL_NETWORK_CATEGORIES}/>
                            <Canvas engine={props.node.getEngine()} onDropCanvas={props.node.onDropCanvas}/>
                        </div>
                        <BottomNav unsatNodeAssertions={unsatNodeAssertions}
                                   allNodeAssertions={allNodeAssertions}
                                   allLinkAssertions={allLinkAssertions}
                                   log={["log"]}
                        />
                    </div>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default KerasClassifierModal;
