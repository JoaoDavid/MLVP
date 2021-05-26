import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RandomForestClassifierModel, CriterionEnum} from "./RandomForestClassifierModel";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface ModalProps {
    node: RandomForestClassifierModel;
    numTreesChanged: (value: number) => void;
    maxDepthChanged: (value: number) => void;
    maxDepthCheckedChanged: (value: boolean) => void;
    criterionChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RandomForestClassifierModal = (props: ModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <InputNumber name={"Number of Trees"} value={props.node.getNumTrees()} setValue={props.numTreesChanged}/>
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

export default RandomForestClassifierModal;
