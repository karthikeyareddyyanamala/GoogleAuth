import React from "react";
import { authLogin, useAuth } from "../ContextApi/authLogin";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
function HomePage(){
    const navigate = useNavigate();
    const {name} = useAuth();
    const {  sign_Out } = useAuth();
    console.log(name)
    if(!getAuth){
        navigate("/")
    }
    return(
        <>
        {
            name?<><h1>Hi Welcome to HomePage Mr.{name}</h1>
            <button onClick={sign_Out}>SignOut</button></>:navigate("/")
        }
        
        </>
    )
}

export default HomePage