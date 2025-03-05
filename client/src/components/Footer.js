import React from 'react'
import { Container, Navbar } from "react-bootstrap";
function Footer() {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" className="justify-content-center">
            <Container className="text-center py-2">
                <p className="text-light m-auto">© 2025 COOK BOOK</p>
            </Container>
        </Navbar>
    )
}

export default Footer