import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AbstractDsModel} from "./AbstractDsModel";


interface AbstractDsModalProps {
    node: AbstractDsModel;
    numColsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numRowsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AbstractDsModal = (props: AbstractDsModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Rows</Form.Label>
                        <Form.Control type="number" min={0} value={props.node.getRows()} onChange={props.numRowsChanged} />
                    </Col>
                    <Col>
                        <Form.Label>Columns</Form.Label>
                        <Form.Control type="number" min={0} value={props.node.getCols()} onChange={props.numColsChanged} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default AbstractDsModal;
