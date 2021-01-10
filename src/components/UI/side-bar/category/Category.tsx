import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import classes from './Category.module.css';
import {NodeConfig} from "../../../nodes/Config";


interface CategoryProps {
    title: string;
    color: string;
    nodes: NodeConfig[];
    format: string;
}

const Category = (props: CategoryProps) => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card className={classes.MyCard}>
                    <Accordion.Toggle className={classes.Title} style={{background: props.color}} as={Card.Header} eventKey="0">
                        {props.title}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.Body}>
                            {props.nodes.map((node) => {
                                return <p key={node.name} draggable={true}
                                          onDragStart={(event) => {
                                              event.dataTransfer.setData(props.format, JSON.stringify(node));
                                          }}>
                                    {node.name}
                                </p>
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Category;
