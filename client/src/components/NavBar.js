import React from 'react'
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GoPersonFill } from "react-icons/go";
function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="text-light">
            <Container>
                <Navbar.Brand href="#home">Cook book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/post"
                            className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                        >
                            Post
                        </NavLink>


                        <NavLink
                            to="/profile/mypost"
                            className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                        >
                            <GoPersonFill />
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar