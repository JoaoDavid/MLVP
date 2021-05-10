import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {LabelDecodingModel} from "./LabelDecodingModel";
import classes from "../../../UI/modal/BaseModal.module.css";


interface LabelDecodingModalProps {
    node: LabelDecodingModel;
    encodedColumnChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelDecodingModal = (props: LabelDecodingModalProps) => {
    const columnNames: JSX.Element[] = [];

    let columnsAndTypes = props.node.getColumnsAndTypes();
    for (let k of Object.keys(columnsAndTypes)) {
        columnNames.push(
            <option key={k}>{k}</option>);
    }

    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Column to be Decoded</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getEncodedColumn()} onChange={props.encodedColumnChanged}>
                            {columnNames}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default LabelDecodingModal;
