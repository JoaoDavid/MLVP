import * as React from 'react';
import Form from "react-bootstrap/Form";
import {LogisticRegressionModel} from "./LogisticRegressionModel";


interface LogisticRegressionModalProps {
    node: LogisticRegressionModel;
}

const LogisticRegressionModal = (props: LogisticRegressionModalProps) => {
    return (
        <Form>
            <Form.Group>

            </Form.Group>
        </Form>
    )
}

export default LogisticRegressionModal;
