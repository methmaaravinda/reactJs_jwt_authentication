import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./css/login.css";
import "./css/animation.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useRQ from "./hooks/useRQ";

function SignUp() {
  const navigate = useNavigate();
  const {signUpQuery}=useRQ();
  const [user, setUser] = useState({
    email: "",
    password: "",
    checkPassword: "",
    accessToken: "",
  });

  useEffect(() => {
    setIsPasswordsMatched(
      user?.password === user?.checkPassword && user?.password
    );
  }, [user]);

  const [fetchError, setFetchError] = useState(false);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const [isPasswordsMatched, setIsPasswordsMatched] = useState(false);

  const onChangeHandler_email_password = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
    setFetchError((prev) => prev && !prev);
  };

  const onClickHandler = async () => {
    await refetch();
    !isError && setUser((prev) => ({ ...prev, email: "", password: "" }));
  };

  const { isLoading, isFetching, isError, error, refetch } = useQuery(
    "signUp",
    () => signUpQuery(user),
    {
      enabled: false,
      onError: () => setFetchError(true),
      onSuccess: () => {
        setTimeout(() => navigate("/"), 5000);
        setShowSuccessMsg(true);
      },
      retry: 0,
    }
  );

  if (showSuccessMsg)
    return (
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col lg={6}>
            <h1 className={`text-center animate-congrats`}>
              Congratulations! You are successfully Sign Up!
            </h1>
          </Col>
        </Row>
      </Container>
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
                type="email"
                placeholder="Enter email"
                onChange={(e) => onChangeHandler_email_password(e, "email")}
                value={user?.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Row>
                <Col xs={11}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      onChangeHandler_email_password(e, "checkPassword")
                    }
                    value={user?.checkPassword}
                  />
                </Col>
                <Col>
                  <Form.Check type="radio" checked={isPasswordsMatched} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword">
              <Form.Label>Re-Enter Password</Form.Label>
              <Row>
                <Col xs={11}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      onChangeHandler_email_password(e, "password")
                    }
                    value={user?.password}
                  />
                </Col>
                <Col>
                  <Form.Check type="radio" checked={isPasswordsMatched} />
                </Col>
              </Row>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>Already Have An Account ? </span>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => navigate("/")}
                  style={{ backgroundColor: "white", color: "black" , borderColor: "black"}}
                  disabled={isLoading || isFetching}
                >
                  Log In
                </Button>
              </div>

              <Button
                disabled={
                  !(user?.email && user?.password) || !isPasswordsMatched
                }
                onClick={onClickHandler}
              >
                {(isLoading || isFetching) && (
                  <>
                    <Spinner animation="grow" size="sm" /> &nbsp;
                  </>
                )}
                Sign Up
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

export default SignUp;
