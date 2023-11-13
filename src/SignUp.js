import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import { signUpQuery } from "./servicers/queries";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

function SignUp() {
  console.log(process.env.REACT_APP_BASE_URL, "new env")
  const [user, setUser] = useState({
    email: "",
    password: "",
    accessToken: "",
  });
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();
  const { isLoading, isError, error, refetch } = useQuery(
    "signUp",
    () => signUpQuery(user),
    {
      enabled: false,
      onError: () => setFetchError(true),
      retry: 0,
    }
  );

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col lg={6}>
          <h1>Sign Up 1</h1>
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
              <Button
                variant="primary"
                type="submit"
                onClick={() => navigate("/")}
              >
                Log In
              </Button>
              <Button
                disabled={!(user?.email && user?.password)}
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
                onClick={() => {
                  refetch();
                  !isError &&
                    setUser((prev) => ({ ...prev, email: "", password: "" }));
                }}
              >
                {isLoading && (
                  <>
                    {" "}
                    <Spinner animation="grow" size="sm" /> &nbsp;{" "}
                  </>
                )}
                Sign Up
              </Button>
            </div>
          </Form>
          <div className="mt-3">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
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

export default SignUp;
