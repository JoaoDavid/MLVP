import * as React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ChangeEvent} from "react";


interface CSVModalProps {
    changed: (files: FileList) => void;
    numCols: number;
    numRows: number;
}

const CSVModal = (props: CSVModalProps) => {
    return (
        <Form>
            <Form.Group id="formGridCheckbox">
                <Form.File onChange={(e: ChangeEvent<HTMLInputElement>) => props.changed(e.target.files!)} label="Load CSV"/>
                <br/>
                <p>Rows: {props.numRows}</p>
                <p>Columns: {props.numCols}</p>
            </Form.Group>
        </Form>
    )
}

export default CSVModal;
