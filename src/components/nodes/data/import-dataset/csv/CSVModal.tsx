import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {ChangeEvent} from "react";
import {CSVModel} from "./CSVModel";
import {FormGroup} from "react-bootstrap";


interface CSVModalProps {
    loadCSV: (files: FileList) => void;
    node: CSVModel;
}

const CSVModal = (props: CSVModalProps) => {
    const labelNames: JSX.Element[] = [];
    const labelCounts: JSX.Element[] = [];
    let counter = 0;
    props.node.getLabels().forEach((value, key) => {
        counter += 1;
        labelNames.push(
            <th key={key + counter}>{key}</th>);
        labelCounts.push(
            <td key={value + "" + counter}>{value}</td>);
    });

    const columnNames: JSX.Element[] = [];
    const columnTypes: JSX.Element[] = [];
    const columnNulls: JSX.Element[] = [];
    props.node.getColumns().forEach((col) => {
        counter += 1;
        columnNames.push(
            <th key={col.getName() + "" + counter}>{col.getName()}</th>);
        columnTypes.push(
            <td key={col.getType() + "" + counter}>{col.getType()}</td>);
        columnNulls.push(
            <td key={col.getType() + "" + col.getNullCounter() + "" + counter}>{col.getNullCounter()}</td>);
    });

    return (
        <Form>
            <Form.Group>
                <Form.File custom onChange={(e: ChangeEvent<HTMLInputElement>) => props.loadCSV(e.target.files)}
                           label={props.node.getFileName() || ""}
                           type="file" accept=".csv"/>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Rows</Form.Label>
                        <Form.Control readOnly placeholder={props.node.getRows().toString()}/>
                    </Col>
                    <Col>
                        <Form.Label>Columns</Form.Label>
                        <Form.Control readOnly placeholder={props.node.getCols().toString()}/>
                    </Col>
                </Row>
            </Form.Group>
            <FormGroup>
                {columnNames.length > 0?<Form.Label>Column Types</Form.Label>:null}
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        {columnNames}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {columnTypes}
                    </tr>
                    <tr>
                        {columnNulls}
                    </tr>
                    </tbody>
                </Table>
            </FormGroup>
            <FormGroup>
                {labelNames.length > 0?<Form.Label>Labels</Form.Label>:null}
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        {labelNames}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {labelCounts}
                    </tr>
                    </tbody>
                </Table>
            </FormGroup>
        </Form>
    )
}

export default CSVModal;
