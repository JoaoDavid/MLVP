import React from 'react';
import classes from './BottomNav.module.css';

interface BottomNavProps {
    sendReq: () => void,
}

const BottomNav = (props: BottomNavProps) => {
    let dev = null;
    if(process.env.NODE_ENV === 'development'){
        dev = (<div><button onClick={props.sendReq}>Send Diagram</button></div>)
    }
    return (
        <div className={classes.BottomNav}>
            {dev}
            v0.0.0
        </div>
    )
}

export default BottomNav;
