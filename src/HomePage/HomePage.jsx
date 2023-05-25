import React from "react";
import { useAuth } from "../ContextApi/authLogin";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";
import PaymentGatway from "../PaymentGatway/PaymentGatway";


function HomePage(){
    
    const {name} = useAuth();
    const {  sign_Out } = useAuth();
    console.log(name)
    

  
    
    return(
        <>
        {
            name?<><h1>Hi Welcome to HomePage Mr.{name}</h1>
            <NavLink to="/chatbox">Chatbox</NavLink><br /><br />
            <PaymentGatway></PaymentGatway>
            <button onClick={sign_Out}>SignOut</button>
            
            </>:<Navigate to="/" replace/>
        }
        
        </>
    )
}

export default HomePage