import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {LabelEncodingModel} from "./LabelEncodingModel";

interface LabelEncodingModalProps {
    node: LabelEncodingModel;
    encodedColumnChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelEncodingModal = (props: LabelEncodingModalProps) => {
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
                        <Form.Label>Original Column</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getOriginalColumn()} onChange={props.encodedColumnChanged}>
                            {columnNames}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default LabelEncodingModal;