import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {RandomForestRegressorModel, CriterionEnum} from "./RandomForestRegressorModel";
import classes from "../../../UI/modal/BaseModal.module.css";
import {useState} from "react";


interface ModalProps {
    node: RandomForestRegressorModel;
    numTreesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setMaxTrees: (value: number) => void;
    criterionChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RandomForestRegressorModal = (props: ModalProps) => {
    const [checkedMaxDepth, setMaxDepthState] = useState(props.node.getMaxDepth()!==-1);
    const [maxDepth, setMaxDepth] = useState(10);

    const updateMaxDepthCheckBox = () => {
        setMaxDepthState(!checkedMaxDepth);
        if (!checkedMaxDepth) {
            props.setMaxTrees(maxDepth);
        } else {
            props.setMaxTrees(-1)
        }

    }

    const maxDepthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setMaxDepth(+event.target.value);
        setMaxDepth(+event.target.value);
    }

    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Number of Trees</Form.Label>
                        <Form.Control type="number" min="1" value={props.node.getNumTrees()} onChange={props.numTreesChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Max Depth</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox defaultChecked={checkedMaxDepth} onChange={updateMaxDepthCheckBox} aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <Form.Control className={classes.Inputs} disabled={!checkedMaxDepth} type="number" min="1" value={checkedMaxDepth?props.node.getMaxDepth():"None"} onChange={maxDepthChanged} />
                        </InputGroup>
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
