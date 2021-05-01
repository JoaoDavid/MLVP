import * as React from 'react';
import Form from "react-bootstrap/Form";
import {VisualizeDatasetModel} from "./VisualizeDatasetModel";
import {FormGroup} from "react-bootstrap";
import Table from "react-bootstrap/Table";


interface VisualizeDatasetModalProps {
    node: VisualizeDatasetModel;
}

const VisualizeDatasetModal = (props: VisualizeDatasetModalProps) => {
    const columnNames: JSX.Element[] = [];
    const columnTypes: JSX.Element[] = [];
    let counter = 0;
    let columnsAndTypes = props.node.getColumnsAndTypes();
    for (let k of Object.keys(columnsAndTypes)) {
        counter += 1;
        columnNames.push(
            <th key={k + "" + counter}>{k}</th>);
        columnTypes.push(
            <td key={columnsAndTypes[k] + "" + counter}>{columnsAndTypes[k]}</td>);
    }

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
                    </tbody>
                </Table>
            </FormGroup>
        </Form>
    )
}

export default VisualizeDatasetModal;
