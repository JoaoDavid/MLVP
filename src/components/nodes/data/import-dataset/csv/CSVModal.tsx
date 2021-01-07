import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ChangeEvent} from "react";
import {CSVNodeModel} from "./CSVNodeModel";


interface CSVModalProps {
    changed: (files: FileList) => void;
    node: CSVNodeModel;
}

const CSVModal = (props: CSVModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Form.File custom onChange={(e: ChangeEvent<HTMLInputElement>) => props.changed(e.target.files!)}
                           label={props.node.getFileName() || ""}/>
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

export default CSVModal;
