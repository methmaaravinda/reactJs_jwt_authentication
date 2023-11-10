import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const axiosPrivate=axios.create({
    baseURL:"http://localhost:3000",
})

axiosPrivate.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
    if(error.response?.data?.err?.name==="TokenExpiredError"){
      const accessToken=await useRefreshToken();
      const {setUser}=useContext(AuthContext);
      setUser(prev=>({...prev, accessToken}))
      if(accessToken){
      error.config.headers.Authorization="Bearer "+accessToken;
      return axiosPrivate(error.config);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  });
 
  export {axiosPrivate};
