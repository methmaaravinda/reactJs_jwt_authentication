import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const axiosPrivate=axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})
axiosPrivate.interceptors.request.use(
  async(request) => {
    // const user={accessToken:123};
   const { user } = useContext(AuthContext);
    const accessToken = user?.accessToken;

    if (!accessToken) {
      request.headers.Authorization = "Bearer " + accessToken;
      return request;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.data?.err?.name === "TokenExpiredError") {
      const accessToken = await useRefreshToken();
      const { setUser } = useContext(AuthContext);
      setUser((prev) => ({ ...prev, accessToken }));

      if (accessToken) {
        error.config.headers.Authorization = "Bearer " + accessToken;
        return axiosPrivate(error.config);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
 
  export {axiosPrivate};
