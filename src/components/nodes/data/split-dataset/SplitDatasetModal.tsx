import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SplitDatasetModel} from "./SplitDatasetModel";


interface SplitDatasetModalProps {
    node: SplitDatasetModel;
    testSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    trainSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shuffleChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SplitDatasetModal = (props: SplitDatasetModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                        <Col>
                            <Form.Label>Test Size</Form.Label>
                            <Form.Control type="number" step="0.01" min="0" max="1" value={props.node.getTestSize()} onChange={props.testSizeChanged}/>
                        </Col>
                        <Col>
                            <Form.Label>Train Size</Form.Label>
                            <Form.Control type="number" step="0.01" min="0" max="1" value={props.node.getTrainSize()} onChange={props.trainSizeChanged}/>
                        </Col>
                        <Col>
                            <Form.Label>Shuffle</Form.Label>
                            <Form.Control as="select" defaultValue={props.node.getShuffle()} onChange={props.node.getShuffle}>
                                <option>{"True"}</option>
                                <option>{"False"}</option>
                            </Form.Control>
                        </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SplitDatasetModal;
