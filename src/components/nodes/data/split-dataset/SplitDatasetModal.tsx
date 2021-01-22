import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SplitDatasetModel} from "./SplitDatasetModel";


interface SplitDatasetModalProps {
    node: SplitDatasetModel;
    testSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SplitDatasetModal = (props: SplitDatasetModalProps) => {
    return (
        <Form>
            <Form.Group>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Form>
                        <Col>
                            <Form.Label>Test Size</Form.Label>
                            <Form.Control type="number" step="0.01" min="0" max="1" value={props.node.getTestSize()} onChange={props.testSizeChanged}/>
                        </Col>
                    </Form>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SplitDatasetModal;
