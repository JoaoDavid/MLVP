import React from 'react';
import classes from './SideBar.module.css';
import Category from "./category/Category";

interface SideBarProps {

}

const SideBar = (props: SideBarProps) => {
    return (
        <div className={classes.SideBar}>
            <Category color={'green'} title={'Data'}/>
            <Category color={'grey'} title={'Model'}/>
            <Category color={'cyan'} title={'Data'}/>
            <Category color={'grey'} title={'Model'}/>
            <Category color={'cyan'} title={'Data'}/>
            <Category color={'grey'} title={'Model'}/>
        </div>
    )
}

export default SideBar;
