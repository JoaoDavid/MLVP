import * as React from 'react';
import Form from "react-bootstrap/Form";
import {LinearRegressionModel} from "./LinearRegressionModel";


interface LinearRegressionModalProps {
    node: LinearRegressionModel;
}

const LinearRegressionModal = (props: LinearRegressionModalProps) => {
    return (
        <Form>
            <Form.Group>

            </Form.Group>
        </Form>
    )
}

export default LinearRegressionModal;
