import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {ChangeEvent} from "react";
import {CSVNodeModel} from "./CSVNodeModel";
import {FormGroup} from "react-bootstrap";


interface CSVModalProps {
    changed: (files: FileList) => void;
    node: CSVNodeModel;
}

const CSVModal = (props: CSVModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Form.File custom onChange={(e: ChangeEvent<HTMLInputElement>) => props.changed(e.target.files!)}
                           label={props.node.getFileName() || ""}
                           type="file" accept=".csv"/>
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
            <FormGroup>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        {props.node.getColumnNames().map((col,counter) => {
                            return <th key={col+counter}>{col}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {/*<td>Empty</td>*/}
                        {/*<td>on</td>*/}
                        {/*<td>purpose</td>*/}
                        {/*<td>WIP</td>*/}
                    </tr>
                    </tbody>
                </Table>
            </FormGroup>
        </Form>
    )
}

export default CSVModal;
