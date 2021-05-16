import * as React from 'react';
import Form from "react-bootstrap/Form";
import {AlgorithmEnum, KNearestNeighborsClassifierModel, WeightsEnum} from "./KNearestNeighborsClassifierModel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


interface KNearestNeighborsClassifierModalProps {
    node: KNearestNeighborsClassifierModel;
    numNeighborsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    weightsChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    algorithmChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const KNearestNeighborsClassifierModal = (props: KNearestNeighborsClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Number of Neighbors</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getNumNeighbors()}
                                      onChange={props.numNeighborsChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Weights</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getWeights().toString()}
                                      onChange={props.weightsChanged}>
                            {Object.values(WeightsEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Algorithm</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getAlgorithm().toString()}
                                      onChange={props.algorithmChanged}>
                            {Object.values(AlgorithmEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default KNearestNeighborsClassifierModal;
