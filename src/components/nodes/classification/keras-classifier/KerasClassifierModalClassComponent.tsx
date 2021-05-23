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
import {TypeChecker, TypeCheckResponse} from "../../../../app/typecheck/TypeChecker";
import createEngine from "@projectstorm/react-diagrams";
import {FactoriesManager} from "../../../../app/FactoriesManager";


interface KerasClassifierModalProps {
    node: KerasClassifierModel;
}

type ModalState = {
    unsatNodeAssertions: Map<BaseNodeModel, string[]>,
    allNodeAssertions: Map<BaseNodeModel, string[]>,
    allLinkAssertions: Map<DefaultLinkModel, string[]>,
    log: string[],
    showCanvas: boolean,
    showModal: boolean,
    modal: React.ReactNode,
};

class KerasClassifierModal extends React.Component<KerasClassifierModalProps, ModalState> {

    constructor(props: KerasClassifierModalProps) {
        super(props);
        this.state = {
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
            log: [],
            showCanvas: true,
            showModal: false,
            modal: null,
        }
        // this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        // this.typeChecker = new TypeChecker(this.engine);
        // this.factoriesManager = new FactoriesManager(this.engine);
        // this.startUp();
        this.registerListeners(this.props.node.getModel());
    }

    processNodeAssertions = (mapNodeAssertions) => {
        const map = new Map<BaseNodeModel, string[]>();

        for (let k of Object.keys(mapNodeAssertions)) {
            const node = this.props.node.getEngine().getModel().getNode(k) as BaseNodeModel;
            map.set(node, mapNodeAssertions[k]);
        }
        return map;
    }

    processLinkAssertions = (typeCheckResponse: TypeCheckResponse) => {
        const map = new Map<DefaultLinkModel, string[]>();

        for (let k of Object.keys(typeCheckResponse.linkAssertions)) {
            const link = this.props.node.getEngine().getModel().getLink(k) as DefaultLinkModel;
            console.log(link)
            map.set(link, typeCheckResponse.linkAssertions[k]);
        }
        return map;
    }

    registerListeners = (model: MyDiagramModel) => {
        model.registerListener({
            nodeUpdated: (event) => {
                console.log("event: nodeUpdated");
                console.log(event);
                this.props.node.getTypeChecker().requestTypeCheck();
            },
            typeCheckResponse: (event) => {
                console.log("event: typeCheckResponse");
                console.log(event);
                const allNodeAssertions = this.processNodeAssertions(event.typeCheckResponse.nodeAssertions);
                const allLinkAssertions = this.processLinkAssertions(event.typeCheckResponse);
                const unsatNodeAssertions = this.processNodeAssertions(event.typeCheckResponse.unsatNodeAssertions);
                // this.processNodeColumns(event.typeCheckResponse.nodeColumns);
                this.setState({
                    unsatNodeAssertions: unsatNodeAssertions,
                    allNodeAssertions: allNodeAssertions,
                    allLinkAssertions: allLinkAssertions,
                });
                this.props.node.getEngine().repaintCanvas();
            },
        });
    }
    render() {
        return (
            <Form>
                <Form.Group>
                    <Row>
                        <div className={classes.FrontPage}>
                            <div className={classes.Container}>
                                <SideBar format={this.props.node.getDragDropFormat()}
                                         categories={NEURAL_NETWORK_CATEGORIES}/>
                                <Canvas engine={this.props.node.getEngine()} onDropCanvas={this.props.node.onDropCanvas}/>
                            </div>
                            <BottomNav unsatNodeAssertions={this.state.unsatNodeAssertions}
                                       allNodeAssertions={this.state.allNodeAssertions}
                                       allLinkAssertions={this.state.allLinkAssertions}
                                       log={this.state.log}
                            />
                        </div>
                    </Row>
                </Form.Group>
            </Form>
        )
    }
}

export default KerasClassifierModal;
