import {axiosPrivate} from '../axios/axios';

const SIGNUP_URL="http://localhost:3000/signUp";
const LOGIN_URL="http://localhost:3000/login";

const logingQuery=(loginData)=>{
    return axiosPrivate.post(LOGIN_URL,{user:loginData})
};
const signUpQuery=(singUpData)=>{
    return axiosPrivate.post(SIGNUP_URL,{user:singUpData})
};

export {logingQuery, signUpQuery};