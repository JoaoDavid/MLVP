import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../../logo-nav-bar.png';
// import LogoNeural from '../../UI/logo_nodes.png';
import classes from './TopNav.module.css';

interface TopNavProps {
    newCanvas: () => void,
    open: (event: React.ChangeEvent<HTMLInputElement>) => void,
    save: () => void,
    generateCodeReq: () => void,
}

const topNav = (props: TopNavProps) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <NavDropdown title="File" id="collasible-nav-dropdown">
                        <label className={classes.Label} htmlFor={"load-save-file"}>Open</label>
                        <input className={classes.Input}
                               type="file"
                               id="load-save-file"
                               accept="application/JSON"
                               onChange={props.open}/>
                        <NavDropdown.Item onClick={props.newCanvas}>New</NavDropdown.Item>
                        {/*<NavDropdown.Item> Open                        </NavDropdown.Item>*/}
                        <NavDropdown.Item onClick={props.save}>Save</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Run" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={props.generateCodeReq}>Generate Code</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Help" id="collasible-nav-dropdown">
                        <NavDropdown.Item>Item</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>About</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default topNav;
