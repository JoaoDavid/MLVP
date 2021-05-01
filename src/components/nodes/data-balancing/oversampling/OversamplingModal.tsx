import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {OversamplingModel} from "./OversamplingModel";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";


interface OversamplingModalProps {
    node: OversamplingModel;
    randomStateChanged: (value: number) => void;
    randomStateCheckedChanged: (value: boolean) => void;
}

const OversamplingModal = (props: OversamplingModalProps) => {
    console.log(props.node.getRandomStateChecked())
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

export default OversamplingModal;
