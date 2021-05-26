import * as React from 'react';
import Form from "react-bootstrap/Form";
import {CompilerModel, LossEnum} from "./CompilerModel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


interface CompilerModalProps {
    node: CompilerModel;
    lossChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompilerModal = (props: CompilerModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Loss</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getLoss().toString()}
                                      onChange={props.lossChanged}>
                            {Object.values(LossEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default CompilerModal;
