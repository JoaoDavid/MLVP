import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {ChangeEvent} from "react";
import {SampleModel} from "./SampleModel";
import {FormGroup} from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styles from "../../../../UI/modal/BaseModal.module.css";


interface SampleModalProps {
    node: SampleModel;
    loadCSV: (files: FileList) => void;
    timeSeriesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SampleModal = (props: SampleModalProps) => {
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
                        <Form.Label>Columns</Form.Label>
                        <Form.Control readOnly placeholder={props.node.getCols().toString()}/>
                    </Col>
                </Row>
            </Form.Group>
            <FormGroup>
                <Col>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch className={styles.Switch}
                                    checked={props.node.getTimeSeries()}
                                    onChange={props.timeSeriesChanged}
                                    color="primary"
                                />
                            }
                            label={"Time Series"}
                            labelPlacement="top"
                        />
                    </FormGroup>
                </Col>
            </FormGroup>
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
            <FormGroup>
                {labelNames.length > 0 ? <Form.Label>Labels</Form.Label> : null}
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

export default SampleModal;
