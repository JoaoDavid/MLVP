import React, {useState} from 'react';
import classes from './BottomNav.module.css';
import {BaseNodeModel} from "../../core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";

interface BottomNavProps {
    nodeProblems: Map<BaseNodeModel, string[]>,
    linkProblems: Map<DefaultLinkModel, string[]>,
}

const BottomNav = (props: BottomNavProps) => {
    const [index, setIndex] = useState(0);
    const showBox: boolean[] = [false, false, false];
    const box: JSX.Element[] = [];


    let dev = (<span>Project under development</span>);
    if (process.env.NODE_ENV === 'development') {
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }


    if (props.nodeProblems.size > 0) {
        props.nodeProblems.forEach((problems, node) => {
            const nodeProblems: JSX.Element[] = [];
            problems.forEach((problem) => {
                nodeProblems.push((<div className={classes.Problem}>{problem}</div>));
            });
            box.push(<div> {node.getTitle() + " (" + node.getOptions().name + ")"} {nodeProblems} </div>)
        });
    }

    if (props.linkProblems.size > 0) {
        props.linkProblems.forEach((problems, link) => {
            const linkProblems: JSX.Element[] = [];
            problems.forEach((problem) => {
                linkProblems.push((<div className={classes.Problem}>{problem}</div>));
            });
            const sourceNode = link.getSourcePort().getNode() as BaseNodeModel;
            const targetNode = link.getTargetPort().getNode() as BaseNodeModel;
            box.push(<div> {"Link from " + sourceNode.getTitle() + " to " + targetNode.getTitle()} {linkProblems} </div>)
        });
    }


    console.log(props.nodeProblems);


    return (
        <div className={classes.Unselectable}>
            <div className={classes.Box}>
                {box}
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
