import * as React from 'react';
import Form from "react-bootstrap/Form";
import {LogisticRegressionModel, PenaltyEnum} from "./LogisticRegressionModel";
import Col from "react-bootstrap/Col";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";
import Row from "react-bootstrap/Row";
import ToggleSwitch from "../../../UI/modal/toggle-switch/ToggleSwitch";
import {FormGroup} from "react-bootstrap";

interface LogisticRegressionModalProps {
    node: LogisticRegressionModel;
    penaltyChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dualChanged: () => void;
    tolChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
                        <Form.Label>Tolerance for stopping criteria</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getTol()}
                                      onChange={props.tolChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>C</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getC()}
                                      onChange={props.cChanged}/>
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
