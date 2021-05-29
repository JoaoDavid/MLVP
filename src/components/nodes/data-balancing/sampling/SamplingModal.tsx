import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {SamplingModel} from "./SamplingModel";
import classes from "../../../UI/modal/BaseModal.module.css";


interface SamplingModalProps {
    node: SamplingModel;
}

const SamplingModal = (props: SamplingModalProps) => {
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

export default SamplingModal;
