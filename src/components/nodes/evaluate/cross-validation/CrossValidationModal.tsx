import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CrossValidationModel} from "./CrossValidationModel";


interface CrossValidationModalProps {
    node: CrossValidationModel;
    numberFoldsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CrossValidationModal = (props: CrossValidationModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Random State</Form.Label>
                        <Form.Control type="number" min="2" value={props.node.getNumberFolds()} onChange={props.numberFoldsChanged} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default CrossValidationModal;
