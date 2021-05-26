import * as React from 'react';
import Form from "react-bootstrap/Form";
import {KernelEnum, SVMClassifierModel} from "./SVMClassifierModel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface SVMClassifierModalProps {
    node: SVMClassifierModel;
    cChanged: (value: number) => void;
    kernelChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    degreeChanged: (value: number) => void;
}

const SVMClassifierModal = (props: SVMClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <InputNumber name={"C"} decimal={true} value={props.node.getC()} setValue={props.cChanged}/>
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
                        <InputNumber name={"Degree"} value={props.node.getDegree()} setValue={props.degreeChanged}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SVMClassifierModal;
