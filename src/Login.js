import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {axiosPrivate} from "./axios/axios"
import { AuthContext } from './context/AuthContext';
import "./css/login.css"
import { useNavigate } from 'react-router-dom';
import {logingQuery} from "./servicers/queries";
import { useQuery } from 'react-query';

function Login() {
  const [user, setUser]=useState({email:"", password:"", accessToken:""});
  const [endPoint, setEndPoint]=useState({endPoint: ""});
  const {user:User, setUser:SetUser}=useContext(AuthContext);
  const navigate=useNavigate();

  // useEffect(()=>{
  //   const controller=new AbortController();
  //   if(endPoint.endPoint=="signUp"){
  //     const handleSignUp = async () => {
  //       try{
  //         const res=await axios.post(
  //           "http://localhost:3000/signUp",
  //           {user},
  //           {signal:controller.signal}
  //         );
  //         console.log(res)
  //       }catch(err){
  //         console.log(err+" error from signUp ")
  //       }
  //     }
  //     handleSignUp()
  //   }

  //   if(endPoint.endPoint=="login"){
  //     const handleLogin = async () => {
  //       try{
  //         setLoging(prev=> ({...prev, isLoading: true}))
  //         const res=await axios.post("http://localhost:3000/login",
  //           {user},
  //           {
  //             withCredentials:true,
  //             signal:controller.signal
  //           }
  //         );
  //         setLoging(prev=>({...prev, isLoading:false, data: res?.data}))
  //         const accessToken =res?.data?.accessToken;
  //         setUser(prev=> ({...prev, accessToken}))
  //         SetUser(prev=> ({...prev, accessToken}))
  //       }catch(err){
  //         setLoging(prev=> ({...prev, isLoading:false, error: err }))
  //         console.log(err+" error from loging! ")
  //       }
  //     }
  //     handleLogin()
  //   }

  //   if(endPoint.endPoint=="refreshToken"){
  //     const handleClick=async()=>{
  //       try{
  //         const res=await axios.get(
  //           'http://localhost:3000/refreshToken',
  //           { 
  //             withCredentials:true,
  //             signal:controller.signal
  //           }
  //         );
  //         console.log("refreshToken", res.data);
  //         setUser(prev=> ({...prev, accessToken: res.data?.accessToken}))
  //       }catch(err){
  //         console.log("error from refresh token!",err)
  //       }
  //     }
  //     handleClick()
  //   }

  //   if(endPoint.endPoint=="hello"){
  //     const handleClickTest=async()=>{
  //       try{
  //         const res=await axiosPrivate.get(
  //           'http://localhost:3000/hello',
  //           {
  //             headers:{
  //               Authorization: `Bearer ${user.accessToken}`
  //             },
  //             signal:controller.signal
  //           }
  //         );
  //         console.log(res);
  //       }catch(err){
  //         console.log("error from hello ",err)
  //       }
  //     }
  //     handleClickTest()
  //   }

  //   return(()=>{
  //     controller.abort()
  //   })

  // },[endPoint])

  // const spinner = loging.isLoading && (
  //   <Spinner
  //     as="span"
  //     animation="border"
  //     size="sm"
  //     role="status"
  //     aria-hidden="true"
  //   />
  // );
  const {isLoading, data, isError, error, isFetching, refetch: loginRequest}=
    useQuery("login", ()=>logingQuery(user));

  if(isLoading)return <h1>Loading ....</h1>;
  // if(isError)return <h1>{error.message}</h1>;
  if(isFetching) return <h1>data fetching...</h1>;

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col lg={6}>
          <h1>Login</h1>
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                // className={loging?.error ? "err_border_clr": ""}
                type="email" 
                placeholder="Enter email" 
                onChange={(e)=> setUser(prev=> ({...prev, email:e.target.value}))}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                // className={loging?.error ? "err_border_clr": ""}
                type="password" 
                placeholder="Password" 
                onChange={(e)=> setUser(prev=> ({...prev, password:e.target.value}))}
                // onFocus={(e)=> setLoging(prev=> (prev.error ?{...prev, error: false} : prev) )}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <Button 
                variant="primary" 
                type="submit" 
                onClick={(e)=>{ e.preventDefault(); loginRequest();}}
              >
                {/* {spinner} */}
                Log In
              </Button>
              <Button
                    variant="secondary"
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        transition: 'background-color 0.3s, color 0.3s',
                        ':hover': {
                          backgroundColor: 'black',
                          color: 'white',
                        },
                    }}
                    onClick={()=> navigate("/signUp")}
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

export default Login;
