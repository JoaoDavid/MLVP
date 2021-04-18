import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {VisualizeDatasetModel} from "./VisualizeDatasetModel";
import {FormGroup} from "react-bootstrap";
import Table from "react-bootstrap/Table";


interface VisualizeDatasetModalProps {
    node: VisualizeDatasetModel;
}

const VisualizeDatasetModal = (props: VisualizeDatasetModalProps) => {
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

export default VisualizeDatasetModal;
