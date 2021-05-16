import * as React from 'react';
import Form from "react-bootstrap/Form";
import {LinearRegressionModel} from "./LinearRegressionModel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";


interface LinearRegressionModalProps {
    node: LinearRegressionModel;
    fitInterceptChanged: () => void;
    normalizeChanged: () => void;
    copyXChanged: () => void;
    numJobsChanged: (value: number) => void;
    numJobsCheckedChanged: (value: boolean) => void;
    positiveChanged: () => void;
}

const LinearRegressionModal = (props: LinearRegressionModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <ToggleSwitch name={"Fit Intercept"} bool={props.node.getFitIntercept()}
                                      changed={props.fitInterceptChanged}/>
                        <ToggleSwitch name={"Normalize"} bool={props.node.getNormalize()}
                                      changed={props.normalizeChanged}/>
                    </Col>
                    <Col>
                        <ToggleSwitch name={"Copy X"} bool={props.node.getCopyX()}
                                      changed={props.copyXChanged}/>
                        <ToggleSwitch name={"Positive"} bool={props.node.getPositive()}
                                      changed={props.positiveChanged}/>
                    </Col>
                    <Col>
                        <InputCheckBox name={"Number of Jobs"} checked={props.node.getNumJobsChecked()}
                                       setChecked={props.numJobsCheckedChanged} value={props.node.getNumJobs()}
                                       setValue={props.numJobsChanged}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default LinearRegressionModal;
