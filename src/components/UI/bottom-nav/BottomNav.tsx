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
    const content: JSX.Element[] = [];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        if (activeTab != newActiveTab) {
            setActiveTab(newActiveTab);
        } else {
            setActiveTab("disabled");
        }
    };

    props.unsatNodeAssertions.forEach((nodeAssertions, node) => {
        const nodeProblems: JSX.Element[] = [];
        nodeAssertions.forEach((assertion) => {
            nodeProblems.push((<li>{assertion}</li>));
        });
        content.push(<div>
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
        const sourceNode = link.getSourcePort().getNode() as BaseNodeModel;
        const targetNode = link.getTargetPort().getNode() as BaseNodeModel;
        assertions.push(
            <ul>
                <li>{"Link from " + sourceNode.getTitle() + " to " + targetNode.getTitle()}</li>
                <ul>
                    {linkProblems}
                </ul>
            </ul>)
    });

    content.push(<div>{assertions}</div>)

    let current_content = null;
    if(activeTab == tabs[0]) {
        current_content = content[0];
    } else if (activeTab == tabs[1]) {
        current_content = content[1];
    } else {
        current_content = (<div></div>)
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
