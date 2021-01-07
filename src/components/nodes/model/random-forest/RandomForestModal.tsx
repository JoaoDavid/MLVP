import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RandomForestNodeModel, CriterionEnum} from "./RandomForestNodeModel";


interface ModalProps {
    node: RandomForestNodeModel;
    numTreesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxDepthChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    criterionChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RandomForestModal = (props: ModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Number of Trees</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getNumTrees()} onChange={props.numTreesChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Max Depth</Form.Label>
                        <Form.Control type="number" min="0" value={props.node.getMaxDepth()} onChange={props.maxDepthChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Criterion</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getCriterion().toString()} onChange={props.criterionChanged}>
                            {Object.values(CriterionEnum).map((e) => {
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
