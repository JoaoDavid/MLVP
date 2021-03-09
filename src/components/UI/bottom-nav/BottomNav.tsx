import React, {useState} from 'react';
import classes from './BottomNav.module.css';
import {BaseNodeModel} from "../../core/BaseNode/BaseNodeModel";

interface BottomNavProps {
    problems: Map<BaseNodeModel, String[]>,
}

const BottomNav = (props: BottomNavProps) => {
    const [index, setIndex] = useState(0);
    const showBox: boolean[] = [false, false, false];
    const box: JSX.Element[] = [];


    let dev = (<span>Project under development</span>);
    if (process.env.NODE_ENV === 'development') {
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }


    if (props.problems.size > 0) {
        props.problems.forEach((problems, node) => {
            const nodeProblems: JSX.Element[] = [];
            problems.forEach((problem) => {
                nodeProblems.push((<div className={classes.Problem}>{problem}</div>));
            });
            box.push(<div className={classes.Box}> {node.getTitle()} {nodeProblems} </div>)
        });
    }


    console.log(props.problems);


    return (
        <div className={classes.Unselectable}>
            {box}

            <div className={classes.BottomNav}>
                <span className={classes.ToggleOn}>Problems</span>
                <span className={classes.Toggle}>Terminal</span>
                <span className={classes.Toggle}>Log</span>
            </div>
        </div>
    )
}

export default BottomNav;
