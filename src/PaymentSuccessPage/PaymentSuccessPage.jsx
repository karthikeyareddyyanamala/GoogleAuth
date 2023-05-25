import React from "react";
import "./PaymentSuccesspage.css"
import { useParams } from "react-router-dom";
function PaymentSuccessPage(){
    const randomString = useParams();
    const handleHomepageRedirect = () => {
      // Redirect to homepage
      window.location.href = "/";
    };
    
    return(
        <div>
       
          <div className="popup-container">
            <div className="popup">
              <h2>Payment Successful!</h2>
              <p>Please check your email for more information.</p>
              <button className="Successbutton" onClick={handleHomepageRedirect}>Close</button>
            </div>
          </div>
      
        </div>
    )
}

export default PaymentSuccessPage