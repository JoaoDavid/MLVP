import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {PCAModel} from "./PCAModel";


interface PCAModalProps {
    node: PCAModel;
    randomStateChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numComponentsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PCAModal = (props: PCAModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Random State</Form.Label>
                        <Form.Control type="number" value={props.node.getRandomState()} onChange={props.randomStateChanged} />
                    </Col>
                    <Col>
                        <Form.Label>Num Components</Form.Label>
                        <Form.Control type="number" min={1} value={props.node.getNumComponents()} onChange={props.numComponentsChanged} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default PCAModal;
