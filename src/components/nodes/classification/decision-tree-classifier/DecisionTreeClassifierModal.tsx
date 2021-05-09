import * as React from 'react';
import Form from "react-bootstrap/Form";
import {DecisionTreeClassifierModel} from "./DecisionTreeClassifierModel";


interface DecisionTreeClassifierModalProps {
    node: DecisionTreeClassifierModel;
}

const DecisionTreeClassifierModal = (props: DecisionTreeClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>

            </Form.Group>
        </Form>
    )
}

export default DecisionTreeClassifierModal;
