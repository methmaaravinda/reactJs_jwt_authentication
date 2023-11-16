// import {axiosPrivate} from '../axios/axios';

// const SIGNUP_URL="/signup";
// const LOGIN_URL="/login";
// const USERS_URL="/users";

// const logingQuery=(loginData)=>{
//     return axiosPrivate.post(LOGIN_URL,{user:loginData})
// };
// const signUpQuery=(singUpData)=>{
//     return axiosPrivate.post(SIGNUP_URL,{user:singUpData})
//     // return axiosPrivate.get(SIGNUP_URL)
// };
// const usersQuery=(page)=>{
//     return axiosPrivate.get(USERS_URL+`/${page}`)
// };

// export {logingQuery, signUpQuery, usersQuery};
import useAxiosPrivate from "./useAxiosPrivate";

const useRQ=()=>{
    const SIGNUP_URL="/signup";
    const LOGIN_URL="/login";
    const USERS_URL="/users";

    const axiosPrivate=useAxiosPrivate();

    const logingQuery=(loginData)=>{
        return axiosPrivate.post(LOGIN_URL,{user:loginData})
    };
    const signUpQuery=(singUpData)=>{
        return axiosPrivate.post(SIGNUP_URL,{user:singUpData})
        // return axiosPrivate.get(SIGNUP_URL)
    };
    const usersQuery=(page)=>{
        return axiosPrivate.get(USERS_URL+`/${page}`)
    };

    return {logingQuery, signUpQuery, usersQuery};
}

export default useRQ;