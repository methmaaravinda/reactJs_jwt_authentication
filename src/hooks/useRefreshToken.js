import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useRefreshToken=()=>{
    const {setUser}=useContext(AuthContext); 
    const refresh=async()=>{
        try{
            const res=await axios.get(
                process.env.REACT_APP_BASE_URL+"/refreshToken",
                {withCredentials:true}
            );
            const accessToken= res.data?.accessToken;
            setUser(prev=> ({...prev, accessToken}));
            return accessToken;
        }catch(err){
            console.log("use refresh token error !",err);
            return null;
        }
    };
    return refresh;
}

export default useRefreshToken;