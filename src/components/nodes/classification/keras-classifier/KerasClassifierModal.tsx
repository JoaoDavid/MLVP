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
        this.newCanvas();
    }

    newCanvas = () => {
        let model = this.props.node.getModel();
        this.registerListeners(model);
        // this.updateLog("New canvas");
        this.setState({
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
        });
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
                const allNodeAssertions = this.props.node.getCanvasManager().processNodeAssertions(event.typeCheckResponse.nodeAssertions);
                const allLinkAssertions = this.props.node.getCanvasManager().processLinkAssertions(event.typeCheckResponse);
                const unsatNodeAssertions = this.props.node.getCanvasManager().processNodeAssertions(event.typeCheckResponse.unsatNodeAssertions);
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
                                <SideBar format={this.props.node.getCanvasManager().getCanvasName()}
                                         categories={NEURAL_NETWORK_CATEGORIES}/>
                                <Canvas engine={this.props.node.getEngine()} onDropCanvas={this.props.node.getCanvasManager().onDropCanvas}/>
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
