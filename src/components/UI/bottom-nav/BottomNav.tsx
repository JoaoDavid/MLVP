import React from 'react';
import classes from './BottomNav.module.css';

interface BottomNavProps {

}

const BottomNav = (props: BottomNavProps) => {
    let dev = (<span>Project under development</span>);
    if(process.env.NODE_ENV === 'development'){
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }
    return (
        <div className={classes.BottomNav}>
            {dev}
        </div>
    )
}

export default BottomNav;
