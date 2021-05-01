import React from 'react';
import classes from './SideBar.module.css';
import Category from "./category/Category";
import {CATEGORIES} from "../../nodes/Config";
import Accordion from "react-bootstrap/Accordion";

interface SideBarProps {
    format: string,
}

const SideBar = (props: SideBarProps) => {
    const categories: JSX.Element[] = [];
    CATEGORIES.forEach((config) => {
        categories.push(
            <Category key={config.category} color={config.color} title={config.category} nodes={config.nodes} format={props.format}/>);
    });
    return (
        <div className={classes.SideBar}>
            <Accordion defaultActiveKey="0">
                {categories}
            </Accordion>
        </div>
    )
}

export default SideBar;
