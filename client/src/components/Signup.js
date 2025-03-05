import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Signup() {
    const { setUserId } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.
            post("http://localhost:8080/api/register", { "name": name, "email": email, 'password': password })
            .then((user) => {
                console.log(user.data.user_id)
                setUserId(user.data.user_id);
            }
            )
            .catch(() => { console.log("not create something wrong") })
        setName("")
        setEmail("")
        setPassword("")
        navigate("/")

    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="mt-3 w-100">
                            Register
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        Go to login page <Link to="/profile/login">Login</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup