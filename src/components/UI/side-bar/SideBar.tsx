import React from 'react';
import classes from './SideBar.module.css';
import Category from "./category/Category";
import {CategoryConfig, NodeConfig} from "../../nodes/Config";

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
            {categories}
        </div>
    )
}

export default SideBar;
