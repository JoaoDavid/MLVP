import * as React from 'react';
import Form from "react-bootstrap/Form";
import {ChangeEvent} from "react";
import {CSVNodeModel} from "./CSVNodeModel";


interface CSVModalProps {
    changed: (files: FileList) => void;
    node: CSVNodeModel;
}

const CSVModal = (props: CSVModalProps) => {
    return (
        <Form>
            <Form.Group id="formGridCheckbox">
                <Form.File onChange={(e: ChangeEvent<HTMLInputElement>) => props.changed(e.target.files!)} label="Load CSV"/>
                <br/>
                <p>{props.node.fileName.length==0?"":props.node.fileName}</p>
                <p>Rows: {props.node.numRows}</p>
                <p>Columns: {props.node.numCols}</p>
            </Form.Group>
        </Form>
    )
}

export default CSVModal;
