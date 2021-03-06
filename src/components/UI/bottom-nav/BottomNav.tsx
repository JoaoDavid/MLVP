import React from 'react';
import classes from './BottomNav.module.css';

interface BottomNavProps {
    problems: string[],
}

const BottomNav = (props: BottomNavProps) => {
    let dev = (<span>Project under development</span>);
    if(process.env.NODE_ENV === 'development'){
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }
    let showProblems = null;

    if (props.problems.length > 0) {
        /*props.problems.forEach((problem)=>{
            return (<span style={{color: "yellow"}}>{problem}</span>);
        });*/
        showProblems = props.problems[0];
    }
    console.log(props.problems);

    return (
        <div className={classes.BottomNav}>
            {/*{dev}*/}
            {showProblems}
        </div>
    )
}

export default BottomNav;
