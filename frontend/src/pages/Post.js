import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Post() {
    // const { userId } = useAuth();
    const userId = useSelector((state) => state.auth.userId);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [value, setValue] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("User not logged in! Please login first.");
            navigate("/profile/login")
            return;
        }

        const postData = {
            title,
            body: value,
            image,
            user_id: userId,
        };
        console.log(postData)
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8080/api/posts", postData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(true)

            setTimeout(() => {
                setMessage(false)
            }, 1500);

            console.log("Response:", response.data);
            setTitle("");
            setValue("");
            setImage(null);
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center">Create a Post</h2>
                    {message &&
                        (<Alert variant="success">
                            Post create successfully
                        </Alert>)
                    }

                    <Form
                        onSubmit={handleSubmit}
                        action="/profile"
                        method="post"
                        encType="multipart/form-data">
                        {/* title */}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {/* body */}
                        <Form.Group className="mt-3">
                            <Form.Label>Post Content</Form.Label>
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                placeholder="Enter your post content..."
                                className="my-3"
                            />
                        </Form.Group>
                        {/* item image */}
                        <Form.Group controlId="image" className="mt-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}

                            />
                        </Form.Group>



                        <Button variant="dark" type="submit" className="mt-3 w-100" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Post"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Post;
