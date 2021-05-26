import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {PCAModel} from "./PCAModel";
import Table from "react-bootstrap/Table";
import {FormGroup} from "react-bootstrap";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface PCAModalProps {
    node: PCAModel;
    randomStateChanged: (value: number) => void;
    randomStateCheckedChanged: (value: boolean) => void;
    numComponentsChanged: (value: number) => void;
}

const PCAModal = (props: PCAModalProps) => {
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
            <Form.Group>
                <Row>
                    <Col>
                        <InputCheckBox name={"Random State"} checked={props.node.getRandomStateChecked()} setChecked={props.randomStateCheckedChanged} value={props.node.getRandomState()} setValue={props.randomStateChanged}/>
                    </Col>
                    <Col>
                        <InputNumber name={"Number of Components"} value={props.node.getNumComponents()} setValue={props.numComponentsChanged}/>
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
                    </tbody>
                </Table>
            </FormGroup>
        </Form>
    )
}

export default PCAModal;
