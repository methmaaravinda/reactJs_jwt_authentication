import { createContext, useState } from "react";

export const AuthContext=createContext(null);

export const AuthContextProvider=({children})=>{
    const [user, setUser]=useState({email:"email", accessToken: "accessToken"});
    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}