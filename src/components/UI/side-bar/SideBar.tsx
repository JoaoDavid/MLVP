import React, { useState } from 'react';
import classes from './SideBar.module.css';
import Category from "./category/Category";
import {CategoryConfig, NodeConfig} from "../../nodes/Config";

interface SideBarProps {
    catAndNames: Map<CategoryConfig, NodeConfig[]>,
    format: string,
}

const SideBar = (props: SideBarProps) => {
    const [isOpen, change] = useState(true);
    const arrClasses = [classes.SideBar];

    const categories: JSX.Element[] = [];
    props.catAndNames.forEach((value, key) => {
        categories.push(
            <Category key={key.category} color={key.color} title={key.category} nodes={value} format={props.format}/>);
    });

    if (isOpen) {
        arrClasses.push(classes.Open);
    } else {
        arrClasses.push(classes.Closed);
    }

    return (
        <div className={arrClasses.join(' ')}>
            <div onClick={()=>{
                    change(!isOpen);
            }}>.</div>
            {categories}
        </div>
    )
}

export default SideBar;
