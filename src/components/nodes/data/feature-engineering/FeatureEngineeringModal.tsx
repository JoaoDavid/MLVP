import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FeatureEngineeringModel} from "./FeatureEngineeringModel";


interface FeatureEngineeringModalProps {
    node: FeatureEngineeringModel;
    linesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeatureEngineeringModal = (props: FeatureEngineeringModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Coding area</Form.Label>
                        <Form.Control onChange={props.linesChanged} as="textarea" rows={3} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default FeatureEngineeringModal;
