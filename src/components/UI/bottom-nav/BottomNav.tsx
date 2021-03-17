import React, {useState} from 'react';
import classes from './BottomNav.module.css';
import {BaseNodeModel} from "../../core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";

interface BottomNavProps {
    unsatNodeAssertions: Map<BaseNodeModel, string[]>,
    allNodeAssertions: Map<BaseNodeModel, string[]>,
    allLinkAssertions: Map<DefaultLinkModel, string[]>,
}

const BottomNav = (props: BottomNavProps) => {
    const tabs = ["Problems", "Assertions", "Log"]
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        if (activeTab != newActiveTab) {
            setActiveTab(newActiveTab);
        } else {
            setActiveTab("disabled");
        }
    };

    const box: JSX.Element[] = [];


    let dev = (<span>Project under development</span>);
    if (process.env.NODE_ENV === 'development') {
        dev = (<span style={{color: "yellow"}}>DEVELOPMENT VERSION</span>);
    }


    if (props.unsatNodeAssertions.size > 0) {
        props.unsatNodeAssertions.forEach((problems, node) => {
            const nodeProblems: JSX.Element[] = [];
            problems.forEach((problem) => {
                nodeProblems.push((<div className={classes.Problem}>{problem}</div>));
            });
            box.push(<div> {node.getTitle() + " (" + node.getOptions().name + ")"} {nodeProblems} </div>)
        });
    }

    /*    if (props.allLinkAssertions.size > 0) {
            props.allLinkAssertions.forEach((problems, link) => {
                const linkProblems: JSX.Element[] = [];
                problems.forEach((problem) => {
                    linkProblems.push((<div className={classes.Problem}>{problem}</div>));
                });
                const sourceNode = link.getSourcePort().getNode() as BaseNodeModel;
                const targetNode = link.getTargetPort().getNode() as BaseNodeModel;
                box.push(<div> {"Link from " + sourceNode.getTitle() + " to " + targetNode.getTitle()} {linkProblems} </div>)
            });
        }*/

    return (
        <div className={classes.Unselectable}>
            <div className={classes.content}>
                {box}
            </div>
            <div className={classes.BottomNav}>
                <ul className={classes.tabs}>
                    {tabs.map((tab) => {
                        return (
                            <li
                                className={tab == activeTab ? classes.current : ""}
                                key={tab}
                                onClick={(e) => handleClick(e, tab)}
                            >
                                {tab}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default BottomNav;
