import React from 'react';
import classes from './SideBar.module.css';
import Category from "./category/Category";
import {CategoryConfig} from "../../nodes/Config";
import Accordion from "react-bootstrap/Accordion";
import {NodeConfig} from "../../core/BaseNode/BaseNodeModel";

interface SideBarProps {
    catAndNames: Map<CategoryConfig, NodeConfig[]>,
    format: string,
}

const SideBar = (props: SideBarProps) => {
    const categories: JSX.Element[] = [];
    props.catAndNames.forEach((value, key) => {
        categories.push(
            <Category key={key.category} color={key.color} title={key.category} nodes={value} format={props.format}/>);
    });
    console.log(props.catAndNames);
    return (
        <div className={classes.SideBar}>
            <Accordion defaultActiveKey="0">
                {categories}
            </Accordion>
        </div>
    )
}

export default SideBar;
