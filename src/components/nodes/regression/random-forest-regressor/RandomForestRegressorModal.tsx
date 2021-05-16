import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {RandomForestRegressorModel, CriterionEnum} from "./RandomForestRegressorModel";
import classes from "../../../UI/modal/BaseModal.module.css";
import {useState} from "react";
import {RandomForestClassifierModel} from "../../classification/random-forest-classifier/RandomForestClassifierModel";
import InputCheckBox from "../../../UI/modal/input-checkbox/InputCheckBox";


interface ModalProps {
    node: RandomForestRegressorModel;
    numTreesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxDepthChanged: (value: number) => void;
    maxDepthCheckedChanged: (value: boolean) => void;
    criterionChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RandomForestRegressorModal = (props: ModalProps) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Number of Trees</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getNumTrees()} onChange={props.numTreesChanged}/>
                    </Col>
                    <Col>
                        <InputCheckBox name={"Max Depth"} checked={props.node.getMaxDepthChecked()}
                                       setChecked={props.maxDepthCheckedChanged} value={props.node.getMaxDepth()}
                                       setValue={props.maxDepthChanged}/>
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

export default RandomForestRegressorModal;
