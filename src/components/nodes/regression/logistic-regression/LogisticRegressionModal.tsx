import * as React from 'react';
import Form from "react-bootstrap/Form";
import {LogisticRegressionModel, PenaltyEnum} from "./LogisticRegressionModel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";
import {FormGroup} from "react-bootstrap";
import InputNumber from "../../../UI/modal/input-number/InputNumber";

interface LogisticRegressionModalProps {
    node: LogisticRegressionModel;
    penaltyChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dualChanged: () => void;
    tolChanged: (value: number) => void;
    cChanged: (value: number) => void;
}

const LogisticRegressionModal = (props: LogisticRegressionModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Penalty</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getPenalty().toString()}
                                      onChange={props.penaltyChanged}>
                            {Object.values(PenaltyEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <InputNumber name={"Tolerance for stopping criteria"} decimal={true} value={props.node.getTol()} setValue={props.tolChanged}/>
                    </Col>
                    <Col>
                        <InputNumber name={"C"} value={props.node.getC()} setValue={props.cChanged}/>
                    </Col>
                </Row>
            </Form.Group>
            <FormGroup>
                <Form.Label></Form.Label>
                <Col>
                    <ToggleSwitch name={"Dual"} bool={props.node.getDual()}
                                  changed={props.dualChanged}/>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default LogisticRegressionModal;
