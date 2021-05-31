import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {VerticalConcatenationModel} from "./VerticalConcatenationModel";


interface VerticalConcatenationModalProps {
    node: VerticalConcatenationModel;
}

const VerticalConcatenationModal = (props: VerticalConcatenationModalProps) => {
    const columnNames: JSX.Element[] = [];

    let columnsAndTypes = props.node.getColumnsAndTypes();
    for (let k of Object.keys(columnsAndTypes)) {
        columnNames.push(
            <option key={k}>{k}</option>);
    }

    return (
        <Form>
            <Form.Group>

            </Form.Group>
        </Form>
    )
}

export default VerticalConcatenationModal;
