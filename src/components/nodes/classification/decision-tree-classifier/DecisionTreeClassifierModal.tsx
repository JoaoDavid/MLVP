import * as React from 'react';
import Form from "react-bootstrap/Form";
import {DecisionTreeClassifierModel, SplitterEnum} from "./DecisionTreeClassifierModel";
import Row from "react-bootstrap/Row";
import {CriterionEnum} from "../random-forest-classifier/RandomForestClassifierModel";
import Col from "react-bootstrap/Col";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";


interface DecisionTreeClassifierModalProps {
    node: DecisionTreeClassifierModel;
    criterionChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    splitterChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxDepthChanged: (value: number) => void;
    maxDepthCheckedChanged: (value: boolean) => void;
}

const DecisionTreeClassifierModal = (props: DecisionTreeClassifierModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Splitter</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getSplitter().toString()}
                                      onChange={props.splitterChanged}>
                            {Object.values(SplitterEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <InputCheckBox name={"Max Depth"} checked={props.node.getMaxDepthChecked()}
                                       setChecked={props.maxDepthCheckedChanged} value={props.node.getMaxDepth()}
                                       setValue={props.maxDepthChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Criterion</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getCriterion().toString()}
                                      onChange={props.criterionChanged}>
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

export default DecisionTreeClassifierModal;
