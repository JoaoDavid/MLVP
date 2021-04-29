import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {UndersamplingModel} from "./UndersamplingModel";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";


interface UndersamplingModalProps {
    node: UndersamplingModel;
    randomStateChanged: (value: number) => void;
    randomStateCheckedChanged: (value: boolean) => void;
}

const UndersamplingModal = (props: UndersamplingModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <InputCheckBox name={"Random State"} checked={props.node.getRandomStateChecked()} setChecked={props.randomStateCheckedChanged} value={props.node.getRandomState()} setValue={props.randomStateChanged}/>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default UndersamplingModal;
