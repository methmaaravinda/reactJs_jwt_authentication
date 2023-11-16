import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Col, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { AuthContext } from "./context/AuthContext";
import useRQ from "./hooks/useRQ";

function Login() {
  const {logingQuery}=useRQ();
  const {setUser: authSetUser}=useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    accessToken: "",
  });
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();
  const { isLoading, isFetching, error,data: response, refetch } = useQuery(
    "login",
    () => logingQuery(user),
    {
      enabled: false,
      onError: () => setFetchError(true),
      onSuccess: () =>{
        // navigate("/user/1")
      },
      retry: 0,
    }
  );

  const handleClick=async()=>{
    await refetch();
  }
  useEffect(() => {
    // Check if the response has data and update the context accordingly
    if (response?.data) {
      const accessToken = response.data.accessToken;
      const email = response.data.email;
      authSetUser((prev) => ({ ...prev, email, accessToken }));
      // You might want to navigate to another page after successful login
      navigate("/user/1");
    }
    // Clean up user state after updating context
    setUser({
      email: "",
      password: "",
      accessToken: "",
    });
  }, [response, authSetUser, navigate]);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col lg={6}>
          <h1>Login </h1>
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, email: e.target.value }));
                  setFetchError((prev) => prev && !prev);
                }}
                value={user?.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, password: e.target.value }));
                  setFetchError((prev) => prev && !prev);
                }}
                value={user?.password}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                  <span>Need An Account? </span>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/signUp")}
                    style={{ backgroundColor: "white", color: "black" , borderColor: "black"}}
                    disabled={isLoading || isFetching}
                  >
                    Sign Up
                  </Button>
                </div>
              <Button
                disabled={!(user?.email && user?.password)}
                onClick={handleClick}
              >
                { (isLoading || isFetching) && (
                  <>
                    <Spinner animation="grow" size="sm" /> &nbsp;
                  </>
                )}
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 ">
        <Col className="" lg={6}>
          <h1 className="text-center bg-danger">
            {fetchError && error?.message}
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
