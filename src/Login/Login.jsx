import React from "react";
import './Login.scss'
import { useAuth } from "../ContextApi/authLogin";
import { useNavigate } from "react-router";


function Login(){
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();
    const { name, email, profilePic } = useAuth();
    
    console.log(name,email,profilePic)
    return(
        <>
        
      {
                name? navigate("/homepage") :  <div  class="google-btn" onClick={signInWithGoogle}>
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p class="btn-text"><b>signInWithGoogle</b></p>
                
          </div>
            }
    
      </>

    );
}

export default Login