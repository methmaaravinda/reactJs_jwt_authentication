import {axiosPrivate} from '../axios/axios';

const SIGNUP_URL="/signup";
const LOGIN_URL="/login";
const USERS_URL="/users";

const logingQuery=(loginData)=>{
    return axiosPrivate.post(LOGIN_URL,{user:loginData})
};
const signUpQuery=(singUpData)=>{
    return axiosPrivate.post(SIGNUP_URL,{user:singUpData})
    // return axiosPrivate.get(SIGNUP_URL)
};
const usersQuery=()=>{
    return axiosPrivate.get(USERS_URL)
};

export {logingQuery, signUpQuery, usersQuery};