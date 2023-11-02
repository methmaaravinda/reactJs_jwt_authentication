import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {axiosPrivate} from "./axios/axios"
import { AuthContext } from './context/AuthContext';
import "./css/login.css"

function SignUp() {
    const [user, setUser]=useState({email:"", password:"", accessToken:""});
    const [fetch, setFetch]=useState({isLoading:false, data: null, error: null})
    const [fetchStart, setFetchStart]=useState({start:true});
  
    useEffect(() => {
        const controller = new AbortController();
        const handleSignUp = async () => {
            try {
                setFetch(prev=> ({error:null, isLoading:true, data: null}));
                const res = await axios.post(
                "http://localhost:3000/signUp",
                { user },
                { signal: controller.signal }
                );
                setFetch(prev=> ({...prev, isLoading:false, data: res.data}))
            } catch (err) {
                setFetch(prev=> ({...prev, isLoading: false, error:err}))
                console.log(err + " error from signUp ");
            }
        };
        handleSignUp();
    
        return () => {
            controller.abort();
        };
    }, [fetchStart]);

    const spinner = fetch.isLoading && (
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        />
    );

    return (
        <Container>
        <Row className="justify-content-center mt-3">
            <Col lg={6}>
            <h1>Sign Up</h1>
            <hr />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    // className={loging?.error && "err_border_clr" }
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    // onFocus={(e) =>
                    // setLoging((prev) => {
                    //     return prev.error ? { ...prev, error: false } : prev;
                    // })
                    // }
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    // className={loging?.error ? "err_border_clr" : ""}
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    // onFocus={(e) =>
                    // setLoging((prev) =>
                    //     prev.error ? { ...prev, error: false } : prev
                    // )
                    // }
                />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setFetchStart({start:true})
                    }}
                >
                    {spinner}
                    Log In
                </Button>
                <Button
                    variant="secondary"
                    style={{
                    backgroundColor: "white",
                    color: "black",
                    transition: "background-color 0.3s, color 0.3s",
                    ":hover": {
                        backgroundColor: "black",
                        color: "white",
                    },
                    }}
                    onClick = { () =>setFetchStart({start:true}) }
                >
                    Sign Up
                </Button>
                </div>
            </Form>
            <div className="mt-3">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
            </Col>
        </Row>
        </Container>
    );
}

export default SignUp;
