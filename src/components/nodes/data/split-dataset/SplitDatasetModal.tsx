import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SplitDatasetModel} from "./SplitDatasetModel";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";


interface SplitDatasetModalProps {
    node: SplitDatasetModel;
    testSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    trainSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shuffleChanged: () => void;
    stratifyChanged: () => void;
}

const SplitDatasetModal = (props: SplitDatasetModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Test Size</Form.Label>
                        <Form.Control type="number" step="0.01" min="0" max="1" value={props.node.getTestSize()}
                                      onChange={props.testSizeChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Train Size</Form.Label>
                        <Form.Control type="number" step="0.01" min="0" max="1" value={props.node.getTrainSize()}
                                      onChange={props.trainSizeChanged}/>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Col>
                    <ToggleSwitch name={"Shuffle"} getBool={props.node.getShuffle} changed={props.shuffleChanged}/>
                    <ToggleSwitch name={"Stratify"} getBool={props.node.getStratify} changed={props.stratifyChanged}/>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default SplitDatasetModal;
