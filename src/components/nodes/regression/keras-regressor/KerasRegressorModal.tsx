import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KerasRegressorModel} from "./KerasRegressorModel";
import Canvas from "../../../UI/canvas/Canvas";
import classes from "./Keras.module.css";
import SideBar from "../../../UI/side-bar/SideBar";
import Row from "react-bootstrap/Row";
import {NEURAL_NETWORK_CATEGORIES} from "../../Config";
import BottomNav from "../../../UI/bottom-nav/BottomNav";
import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";
import {MyDiagramModel} from "../../../../app/diagram/MyDiagramModel";
import Col from "react-bootstrap/Col";
import {Modal} from "react-bootstrap";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface KerasRegressorModalProps {
    node: KerasRegressorModel;
    epochsChanged: (value: number) => void;
    batchSizeChanged: (value: number) => void;
    verboseChanged: (value: number) => void;
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

class KerasRegressorModal extends React.Component<KerasRegressorModalProps, ModalState> {

    constructor(props: KerasRegressorModalProps) {
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
        model.clearListeners();
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
            modalContent: (event) => {
                console.log("event: modalContent in modal");
                this.setState({modal: event.modal});
                this.openModal();
                this.props.node.getCanvasManager().getEngine().repaintCanvas();
            }
        });
    }

    closeModal = () => {
        this.setState({showModal: false});
        this.props.node.getCanvasManager().getEngine().getModel().setLocked(false);
    }

    openModal = () => {
        this.setState({showModal: true})
        this.props.node.getCanvasManager().getEngine().getModel().setLocked(true);
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                            <InputNumber name={"Epochs"} value={this.props.node.getEpochs()} setValue={this.props.epochsChanged}/>
                        </Col>
                        <Col>
                            <InputNumber name={"Batch Size"} value={this.props.node.getBatchSize()} setValue={this.props.batchSizeChanged}/>
                        </Col>
                        <Col>
                            <InputNumber name={"Verbose"} value={this.props.node.getVerbose()} setValue={this.props.verboseChanged}/>
                        </Col>
                    </Row>
                    <p></p>
                    <Row><Col>
                        <Form.Label>Neural Network</Form.Label>
                        <>
                            <Modal animation={false} size="xl" show={this.state.showModal} onHide={this.closeModal}>
                                {this.state.modal}
                            </Modal>
                        </>
                        <div className={classes.FrontPage}>
                            <div className={classes.Container}>
                                <SideBar format={this.props.node.getCanvasManager().getCanvasName()}
                                         categories={NEURAL_NETWORK_CATEGORIES}/>
                                <Canvas engine={this.props.node.getEngine()}
                                        onDropCanvas={this.props.node.getCanvasManager().onDropCanvas}/>
                            </div>
                            <BottomNav unsatNodeAssertions={this.state.unsatNodeAssertions}
                                       allNodeAssertions={this.state.allNodeAssertions}
                                       allLinkAssertions={this.state.allLinkAssertions}
                                       log={this.state.log}
                            />
                        </div>
                    </Col></Row>
                </Form.Group>
            </Form>
        )
    }
}

export default KerasRegressorModal;
