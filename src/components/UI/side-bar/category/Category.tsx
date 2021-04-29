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
            <Card className={classes.MyCard}>
                <Accordion.Toggle className={classes.Title} style={{background: props.color}} as={Card.Header}
                                  eventKey={props.title}>
                    {props.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.title}>
                    <Card.Body className={classes.Body}>
                        {props.nodes.map((node) => {
                            return <div key={node.name} draggable={true} className={classes.Node}
                                        onDragStart={(event) => {
                                            event.dataTransfer.setData(props.format, JSON.stringify(node));
                                        }}>
                                {node.name}
                            </div>
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

        </div>
    )
}

export default Category;
