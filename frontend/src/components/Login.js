


import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/login", { email, password }, { withCredentials: true })
      .then((response) => {
        console.log("Login successful",)

        if (response.status === 200) {
          dispatch(fetchAllPosts());
          navigate("/");
        }

      })
      .catch((err) => {
        console.log("Login failed", err);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={5}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
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
              Login
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/profile/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login