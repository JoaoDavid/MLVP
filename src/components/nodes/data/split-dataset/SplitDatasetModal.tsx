import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SplitDatasetModel} from "./SplitDatasetModel";


interface SplitDatasetModalProps {
    node: SplitDatasetModel;
}

const SplitDatasetModal = (props: SplitDatasetModalProps) => {
    return (
        <Form>
            <Form.Group>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Columns</Form.Label>
                        <Form.Control readOnly placeholder={props.node.getCols().toString()}/>
                    </Col>
                    <Col>
                        <Form.Label>Rows</Form.Label>
                        <Form.Control readOnly placeholder={props.node.getRows().toString()}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SplitDatasetModal;
