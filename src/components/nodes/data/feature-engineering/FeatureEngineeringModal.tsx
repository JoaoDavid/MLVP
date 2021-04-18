import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FeatureEngineeringModel} from "./FeatureEngineeringModel";
import TextField from '@material-ui/core/TextField';


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
                        <TextField
                            id="standard-multiline-static"
                            label="Coding area"
                            multiline
                            rows={10}
                            onChange={props.linesChanged}
                            defaultValue={props.node.getLines()}
                            fullWidth={true}
                            // error={props.node.getErrorLines()} TODO
                        />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default FeatureEngineeringModal;
