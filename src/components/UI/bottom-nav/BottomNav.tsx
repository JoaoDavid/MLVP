import React, {useState} from 'react';
import classes from './BottomNav.module.css';
import {BaseBlockModel} from "../../base/base-block/BaseBlockModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";

interface BottomNavProps {
    unsatNodeAssertions: Map<BaseBlockModel, string[]>,
    allNodeAssertions: Map<BaseBlockModel, string[]>,
    allLinkAssertions: Map<DefaultLinkModel, string[]>,
    log: string[],
}

const BottomNav = (props: BottomNavProps) => {
    const tabs = ["Problems", "Assertions", "Log"]
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        if (activeTab !== newActiveTab) {
            setActiveTab(newActiveTab);
        } else {
            setActiveTab("disabled");
        }
    };

    const unsat: JSX.Element[] = [];
    props.unsatNodeAssertions.forEach((nodeAssertions, node) => {
        const nodeProblems: JSX.Element[] = [];
        nodeAssertions.forEach((assertion) => {
            nodeProblems.push((<li>{assertion}</li>));
        });
        unsat.push(<div>
            <ul className={classes.list}>
                <li>{node.getTitle()}</li>
                <ul className={classes.list}>
                    {nodeProblems}
                </ul>
            </ul>
        </div>)
    });


    const assertions: JSX.Element[] = [];
    props.allNodeAssertions.forEach((nodeAssertions, node) => {
        const nodeProblems: JSX.Element[] = [];
        nodeAssertions.forEach((assertion) => {
            nodeProblems.push((<li>{assertion}</li>));
        });
        assertions.push(
            <ul className={classes.list}>
                <li>{node.getTitle()}</li>
                <ul className={classes.list}>
                    {nodeProblems}
                </ul>
            </ul>)
    });

    props.allLinkAssertions.forEach((linkAssertions, link) => {
        const linkProblems: JSX.Element[] = [];
        linkAssertions.forEach((assertion) => {
            linkProblems.push((<li>{assertion}</li>));
        });
        const sourceNode = link.getSourcePort().getNode() as BaseBlockModel;
        const targetNode = link.getTargetPort().getNode() as BaseBlockModel;
        assertions.push(
            <ul className={classes.list}>
                <li>{"Link from " + sourceNode.getTitle() + " to " + targetNode.getTitle()}</li>
                <ul className={classes.list}>
                    {linkProblems}
                </ul>
            </ul>)
    });


    const logLi: JSX.Element[] = [];
    props.log.forEach((message) => {
        logLi.push(<li>{message}</li>);
    });
    const logJSX = (<ul className={classes.list}>{logLi}</ul>);



    let current_content = null;
    if(activeTab === tabs[0]) {
        current_content = unsat;
    } else if (activeTab === tabs[1]) {
        current_content = assertions;
    } else if (activeTab === tabs[2]) {
        current_content = logJSX;
    }


    return (
        <div className={classes.Unselectable}>
            <div className={classes.Box}>
                {current_content}
            </div>
            <div className={classes.BottomNav}>
                <ul className={classes.tabs}>
                    {tabs.map((tab) => {
                        return (
                            <li
                                className={tab === activeTab ? classes.current : classes.NotCurrent}
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
