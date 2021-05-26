import * as React from 'react';
import Form from "react-bootstrap/Form";
import {ActivationEnum, DenseModel} from "./DenseModel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputNumber from "../../../../UI/modal/input-number/InputNumber";


interface DenseModalProps {
    node: DenseModel;
    unitsChanged: (value: number) => void;
    activationChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DenseModal = (props: DenseModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <InputNumber name={"Number of Units"} value={props.node.getUnits()} setValue={props.unitsChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Activation</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getActivation().toString()}
                                      onChange={props.activationChanged}>
                            {Object.values(ActivationEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default DenseModal;
