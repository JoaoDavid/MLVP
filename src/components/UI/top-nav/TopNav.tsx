import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../../logo-nav-bar.png';
import classes from './TopNav.module.css';

interface TopNavProps {
    newCanvas: () => void,
    open: (event: React.ChangeEvent<HTMLInputElement>) => void,
    save: () => void,
    requestCompilation: () => void,
    loadDemos: Map<String, ()=>void>,
}

const topNav = (props: TopNavProps) => {
    const demos: JSX.Element[] = [];
    props.loadDemos.forEach((value, key) => {
        demos.push(
            <NavDropdown.Item key={key.toString()} className={classes.NavDropdownItem} onClick={value}>{key}</NavDropdown.Item>);
    });
    return (
        <Navbar className={classes.Unselectable} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={Logo}
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown className={classes.NavDropDown} title="File" id="collasible-nav-dropdown">
                        <div className={classes.NavDropdownItem} >
                            <label className={classes.Label} htmlFor={"load-save-file"}>Open</label>
                            <input className={classes.Input}
                                   type="file"
                                   id="load-save-file"
                                   accept="application/JSON"
                                   onChange={props.open}/>
                        </div>
                        <NavDropdown.Item className={classes.NavDropdownItem} onClick={props.newCanvas}>New</NavDropdown.Item>
                        <NavDropdown.Item className={classes.NavDropdownItem} onClick={props.save}>Save</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown  title="Run" id="collasible-nav-dropdown">
                        <NavDropdown.Item className={classes.NavDropdownItem} onClick={props.requestCompilation}>Compile</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown  title="Demos" id="collasible-nav-dropdown">
                        {demos}
                    </NavDropdown>
                    <NavDropdown title="Help" id="collasible-nav-dropdown">
                        <NavDropdown.Item >Help</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item>About</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default topNav;
