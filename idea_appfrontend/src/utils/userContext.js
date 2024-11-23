import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState();
    const [error, setError] = useState();
    const [message , setMessage] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <userContext.Provider value={{user,setUser,message,setMessage,error, setError}}>
            {children}
        </userContext.Provider>
    )
}