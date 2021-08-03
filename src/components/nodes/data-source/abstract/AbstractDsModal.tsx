import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AbstractDsModel} from "./AbstractDsModel";
import {FormGroup} from "react-bootstrap";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";
import InputNumber from "../../../UI/modal/input-number/InputNumber";

interface AbstractDsModalProps {
    node: AbstractDsModel;
    numColsChanged: (value: number) => void;
    numRowsChanged: (value: number) => void;
    timeSeriesChanged: () => void;
    balancedChanged: () => void;
}

const AbstractDsModal = (props: AbstractDsModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <InputNumber name={"Rows"} value={props.node.getRows()} setValue={props.numRowsChanged}/>
                    </Col>
                    <Col>
                        <InputNumber name={"Columns"} value={props.node.getCols()} setValue={props.numColsChanged}/>
                    </Col>
                </Row>
            </Form.Group>
            <FormGroup>
                <Form.Label>Dataset Properties</Form.Label>
                <Col>
                    <ToggleSwitch name={"Time Series"} bool={props.node.getTimeSeries()}
                                  changed={props.timeSeriesChanged}/>
                    <ToggleSwitch name={"Balanced"} bool={props.node.getBalanced()}
                                  changed={props.balancedChanged}/>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default AbstractDsModal;
