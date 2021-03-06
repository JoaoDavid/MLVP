import * as React from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {TemporalAggregationModel, MetricEnum} from "./TemporalAggregationModel";
import classes from "../../../UI/modal/BaseModal.module.css";
import InputNumber from "../../../UI/modal/input-number/InputNumber";


interface ModalProps {
    node: TemporalAggregationModel;
    newColumnNameChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    originalColumnNameChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    metricChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
    windowSizeChanged: (value: number) => void;
}

const TemporalAggregationModal = (props: ModalProps) => {
    const columnNames: JSX.Element[] = [];

    let columnsAndTypes = props.node.getColumnsAndTypes();
    for (let k of Object.keys(columnsAndTypes)) {
        columnNames.push(
            <option key={k}>{k}</option>);
    }

    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>New Column</Form.Label>
                        <Form.Control type="text" min="1" value={props.node.getNewColumnName()} onChange={props.newColumnNameChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Original Column</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getOriginalColumnName()} onChange={props.originalColumnNameChanged}>
                            {columnNames}
                        </Form.Control>
                    </Col>
                    <Col>
                        <InputNumber name={"Window Size"} value={props.node.getWindowSize()} setValue={props.windowSizeChanged}/>
                    </Col>
                    <Col>
                        <Form.Label>Metric</Form.Label>
                        <Form.Control as="select" defaultValue={props.node.getMetric().toString()} onChange={props.metricChanged}>
                            {Object.values(MetricEnum).map((e) => {
                                return <option key={e}>{e}</option>
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default TemporalAggregationModal;
