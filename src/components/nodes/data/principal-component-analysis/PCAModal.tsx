import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {PCAModel} from "./PCAModel";
import Table from "react-bootstrap/Table";
import {FormGroup} from "react-bootstrap";


interface PCAModalProps {
    node: PCAModel;
    randomStateChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numComponentsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PCAModal = (props: PCAModalProps) => {
    const columnNames: JSX.Element[] = [];
    const columnTypes: JSX.Element[] = [];
    const columnNulls: JSX.Element[] = [];
    let counter = 0;
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
            <FormGroup>
                {columnNames.length > 0 ? <Form.Label>Column Types</Form.Label> : null}
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
        </Form>
    )
}

export default PCAModal;
