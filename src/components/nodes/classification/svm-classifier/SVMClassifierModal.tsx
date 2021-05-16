import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KernelEnum, SVMClassifierModel} from "./SVMClassifierModel";
import Col from "react-bootstrap/Col";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";
import {CriterionEnum} from "../random-forest-classifier/RandomForestClassifierModel";
import Row from "react-bootstrap/Row";


interface SVMClassifierModalProps {
    node: SVMClassifierModel;
    cChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    kernelChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    degreeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SVMClassifierModal = (props: SVMClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>C</Form.Label>
                        <Form.Control type="number" min="1.0" step="0.01" value={props.node.getC()}
                                      onChange={props.cChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Kernel</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getKernel().toString()}
                                      onChange={props.kernelChanged}>
                            {Object.values(KernelEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Degree</Form.Label>
                        <Form.Control type="number" min="0" value={props.node.getDegree()}
                                      onChange={props.degreeChanged}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SVMClassifierModal;
