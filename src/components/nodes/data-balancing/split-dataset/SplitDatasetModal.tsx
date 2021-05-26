import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SplitDatasetModel} from "./SplitDatasetModel";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface SplitDatasetModalProps {
    node: SplitDatasetModel;
    testSizeChanged: (value: number) => void;
    trainSizeChanged: (value: number) => void;
    shuffleChanged: () => void;
    stratifyChanged: () => void;
}

const SplitDatasetModal = (props: SplitDatasetModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <InputNumber name={"Test Size"} decimal={true} value={props.node.getTestSize()} setValue={props.testSizeChanged}/>
                    </Col>
                    <Col>
                        <InputNumber name={"Train Size"} decimal={true} value={props.node.getTrainSize()} setValue={props.trainSizeChanged}/>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Col>
                    <ToggleSwitch name={"Shuffle"} bool={props.node.getShuffle()} changed={props.shuffleChanged}/>
                    <ToggleSwitch name={"Stratify by Class"} bool={props.node.getStratifyByClass()} changed={props.stratifyChanged}/>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default SplitDatasetModal;
