import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RandomForestNodeModel, criterionEnum} from "./RandomForestNodeModel";


interface ModalProps {
    node: RandomForestNodeModel;
}

const RandomForestModal = (props: ModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Number of Trees</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.numTrees} onChange={props.node.changedNumTrees}/>
                    </Col>
                    <Col>
                        <Form.Label>Max Depth</Form.Label>
                        <Form.Control type="number" min="0" />
                    </Col>
                    <Col>
                        <Form.Label>Criterion</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            {Object.values(criterionEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default RandomForestModal;
