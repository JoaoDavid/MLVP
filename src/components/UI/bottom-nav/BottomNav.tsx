import React from 'react';
import classes from './BottomNav.module.css';

interface BottomNavProps {
    problems: string[],
}

const BottomNav = (props: BottomNavProps) => {
    let dev = (<span>Project under development</span>);
    if (process.env.NODE_ENV === 'development') {
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }
    const showProblems: JSX.Element[] = [];


    let problemsBox = null;
    if (props.problems.length > 0) {
        props.problems.forEach((problem) => {
            showProblems.push((<p className={classes.Problem}>{problem}</p>));
        });
        problemsBox = (<div className={classes.Box}> {showProblems} </div>);
    }



    console.log(props.problems);

    return (
        <div>
            {problemsBox}
            <div className={classes.BottomNav}>
                {dev}
            </div>
        </div>
    )
}

export default BottomNav;
