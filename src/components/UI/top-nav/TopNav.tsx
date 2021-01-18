import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Image from '../../../logo.png';
// import LogoNeural from '../../UI/logo_nodes.png';

interface TopNavProps {
    open: () => void,
    save: () => void,
}

const topNav = (props: TopNavProps) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                {/*<img
                    alt=""
                    src={Image}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />*/} {' '}
                MLVP
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="File" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={props.open}>Open</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.save}>Save</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link>Item</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default topNav;
