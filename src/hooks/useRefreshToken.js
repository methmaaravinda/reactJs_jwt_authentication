import { axiosPrivate } from "../axios/axios";


const useRefreshToken=async()=>{
    try{
        const res=await axiosPrivate.get("/refreshToken",{withCredentials:true});
        return res.data?.accessToken;
    }catch(err){
        console.log(err);
        return null;
    }
}

export default useRefreshToken;