import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function ProfilePage(){
    const { userName } = useParams();
    const {userEmail} = useParams();

    return(
        <>
         <div>
      <h4>UserName:{userName}</h4>
        <h4>Email:{userEmail}</h4>
      
      {/* Add other user profile information here */}
      <Link to="privateChatbox">Message to {userName} </Link>
    </div>
        </>
    )
}

export default ProfilePage