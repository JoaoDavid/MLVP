import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import classes from './Category.module.css';
import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";


interface CategoryProps {
    title: string;
    color: string;
    //nodes: CoreNodeModel[];
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
                            <p>Import from CSV</p>
                            <p>agaeg</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Category;
