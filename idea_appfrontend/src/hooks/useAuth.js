import axios from "axios";
import { BACKEND_URL } from "../utils/url";
import { useContext } from "react";
import { userContext } from "../utils/userContext";
const useAuth = ()=>{
    const {setUser,setError,message,setMessage} = useContext(userContext);

    const authenticate = async(userData, isLogIn)=>{

        if(isLogIn){
            try{
                const response = await axios.post(`${BACKEND_URL}/users/login` ,userData);
                console.log(response);
                setMessage(response.data.message);
                localStorage.setItem("user",JSON.stringify(response.data.data.user));
                localStorage.setItem("accessToken",response.data.data.accessToken);
                setUser(response.data.data.user);
            }catch(error){
                console.log(error.response.data.message);
                setError(error.response.data.message);
            }
        }else{
            try{
                const response = await axios.post(`${BACKEND_URL}/users/register` ,userData);
                console.log(response);
                setMessage(response.data.message);
            }catch(error){
                console.log(error.response.data.message);
                setError(error.response.data.message);
            }
        }
    }

    return {authenticate};

}

export default useAuth;