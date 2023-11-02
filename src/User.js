import React, { useContext } from 'react'
import { Badge, Container, Row } from 'react-bootstrap'
import { AuthContext } from './context/AuthContext'

function User() {
    const {user}=useContext(AuthContext);
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <h1>
                    <Badge bg="secondary">email : </Badge>
                </h1>
                <p>
                    {user?.email}
                </p>
                <h1>
                    <Badge bg="secondary">accessToken : </Badge>
                </h1>
                <p>
                    {user?.accessToken}
                </p>
            </Row>
        </Container>
    )
}

export default User