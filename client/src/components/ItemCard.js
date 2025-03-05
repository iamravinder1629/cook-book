import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import DOMPurify from "dompurify";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import axios from 'axios'
import { useAuth } from "../context/AuthContext";


function ItemCard({ post }) {
    const { userId } = useAuth();

    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFavorite = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/fav/${userId}/${post._id}`);
            console.log(response.data);
            handleClose();
            setIcon(response.data.message)
        } catch (error) {
            console.error(error.response?.data || "Error fetching favorite post");
        }
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{post.title}</Modal.Title>
                </Modal.Header>
                <Card.Img className='m-auto' variant="top" src={post.image} style={{ width: "200px" }} />
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
                    <div>
                        <p><b>post At:</b> <i>{post.createdAt.slice(0, 10)}</i></p>
                        <p><b>post By:</b> <i>{post.user_id.name}</i></p>
                    </div>
                    <Button className='text-light btn-dark mt-2'
                        onClick={() => { handleFavorite() }}>
                        <MdFavorite />
                        <MdFavoriteBorder />
                    </Button>
                </Modal.Body>
            </Modal>



            <Card style={{ width: '18rem' }} className='my-4'>
                <Card.Img variant="top" src={`/${post.image}`} style={{ width: '100%', height: "250px" }} className='img-fluid' />
                <Card.Body>
                    <p className='float-end'><b>BY:</b> <i>{post.user_id.name}</i></p>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.
                                sanitize(post.body.slice(0, 50))
                        }} />
                        <a href='#' onClick={handleShow}>Read More</a>
                    </Card.Text>
                    <Button className='text-dark btn-light' onClick={handleFavorite}>
                        {
                            icon === "Item added to favorites" ? <MdFavorite /> : <MdFavoriteBorder />
                        }
                    </Button>
                </Card.Body>
            </Card>

        </>
    )
}

export default ItemCard



