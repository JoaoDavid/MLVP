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
            showProblems.push((<div className={classes.Problem}>{problem}</div>));
        });
        problemsBox = (<div className={classes.Box}> {showProblems} </div>);
    }


    console.log(props.problems);

    return (
        <div className={classes.Unselectable}>
            <div className={classes.Box}>
                <div>
                    problem a
                </div>
                <div>
                    problem b
                </div>
                {showProblems}
            </div>
            <div className={classes.BottomNav}>
                <span className={classes.ToggleOn}>Problems</span>
                <span className={classes.Toggle}>Terminal</span>
                <span className={classes.Toggle}>Log</span>
            </div>
        </div>
    )
}

export default BottomNav;
