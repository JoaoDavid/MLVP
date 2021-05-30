import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SamplingModel} from "./SamplingModel";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";
import InputNumber from "../../../UI/modal/input-number/InputNumber";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";


interface SamplingModalProps {
    node: SamplingModel;
    fracChanged: (value: number) => void;
    replaceChanged: () => void;
    randomStateChanged: (value: number) => void;
    randomStateCheckedChanged: (value: boolean) => void;
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
                <Row>
                    <Col>
                        <InputNumber name={"Fraction"} decimal={true} value={props.node.getFrac()}
                                     setValue={props.fracChanged}/>
                    </Col>
                    <Col>
                        <ToggleSwitch name={"Replace"} bool={props.node.getReplace()}
                                      changed={props.replaceChanged}/>
                    </Col>
                    <Col>
                        <InputCheckBox name={"Random State"} checked={props.node.getRandomStateChecked()}
                                       setChecked={props.randomStateCheckedChanged} value={props.node.getRandomState()}
                                       setValue={props.randomStateChanged}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SamplingModal;
