import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, Form } from 'react-bootstrap';
import { GoPersonFill } from "react-icons/go";
import { setSearchQuery, fetchSearchResults, fetchAllPosts } from "../redux/slices/authSlice";

function NavBar() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(setSearchQuery(query));

            if (query.trim()) {
                dispatch(fetchSearchResults(query)); // Fetch search results
            } else {
                dispatch(fetchAllPosts()); // Fetch all posts if search is empty
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, dispatch]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="text-light">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="/">Cook Book</Navbar.Brand>

                <div className="d-flex flex-grow-1 justify-content-center">
                    <Form className="d-flex w-75">
                        <Form.Control
                            type="search"
                            placeholder="Search..."
                            className="me-2"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Form>
                </div>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}>
                            Home
                        </NavLink>
                        <NavLink to="/post" className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}>
                            Post
                        </NavLink>
                        <NavLink to="/profile/mypost" className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}>
                            <GoPersonFill />
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

