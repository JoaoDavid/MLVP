import * as React from 'react';
import Form from "react-bootstrap/Form";
import {GammaEnum, SVMRegressorModel} from "./SVMRegressorModel";
import Col from "react-bootstrap/Col";
import {KernelEnum} from "../../classification/svm-classifier/SVMClassifierModel";
import Row from "react-bootstrap/Row";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface SVMRegressorModalProps {
    node: SVMRegressorModel;
    kernelChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    degreeChanged: (value: number) => void;
    gammaChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SVMRegressorModal = (props: SVMRegressorModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
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
                        <InputNumber name={"Degree"} value={props.node.getDegree()} setValue={props.degreeChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Gamma</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getGamma().toString()}
                                      onChange={props.gammaChanged}>
                            {Object.values(GammaEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SVMRegressorModal;
