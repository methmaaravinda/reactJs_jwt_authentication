import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate=()=>{
    const axiosPrivate=axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
    })

    const {user}=useContext(AuthContext);
    const refresh=useRefreshToken();

    useEffect(()=>{
        const requestInterceptor=axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers.Authorization){
                    config.headers.Authorization=`Bearer ${user?.accessToken}`;
                }
                return config;
            },
            error=>Promise.reject(error)
        );

        const responseInterceptor=axiosPrivate.interceptors.response.use(
            response=> response,
            async(error)=> {
                if (
                    (error.response.data.err?.name === "TokenExpiredError" 
                    || error.response.data.err?.name === "JsonWebTokenError")
                     && !error.config?.sent
                    ){
                    const accessToken=await refresh();
                    error.config.sent=true;
                    error.config.headers.Authorization=`Bearer ${accessToken}`;
                    console.log("send",error?.config)
                    return axiosPrivate(error?.config);
                }
                return Promise.reject(error);
            }
        )
        return ()=>{
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    },[user, refresh])

    return axiosPrivate;
}
export default useAxiosPrivate; 