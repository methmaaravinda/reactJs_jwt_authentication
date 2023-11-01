import React, { useContext } from 'react'
import { Badge, Container, Row } from 'react-bootstrap'
import { AuthContext } from './context/AuthContext'

function User() {
    const {user}=useContext(AuthContext);
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <h1>
                    <Badge bg="secondary">email : {user?.email}</Badge>
                </h1>
                <h1>
                    <Badge bg="secondary">accessToken : {user?.accessToken}</Badge>
                </h1>
            </Row>
        </Container>
    )
}

export default User