import React, { useState, useEffect} from "react";
import { useAuth } from "../ContextApi/authLogin";
import { Navigate } from "react-router";
import "./ChatBox.css";
import { firebaseConfig } from "../ContextApi/authLogin";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Link , useNavigate} from "react-router-dom";


function ChatBox() {
 
  const [messages, setMessages] = useState([]);
  
  const { name, profilePic, email } = useAuth();
  const sender = name;
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const navigate = useNavigate();
  useEffect(() => {
    // Get messages from the database in real-time
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const messagesArray = [];
      snapshot.forEach((childSnapshot) => {
        messagesArray.push(childSnapshot.val());
      });
      setMessages(messagesArray);
      
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    event.target.elements.message.value = "";
    
    if (message) {
      // Set the username before pushing to the database
      
      // Add a new message to the database
      push(ref(database, "messages"), {
        message: message,
        username: sender,
        profile:profilePic,
        email:email,
        timestamp: Date.now(),
      });
    }
    
    
  };
  const HandleUserClick = (user) => {
    
    
    const userName = user.name; // assuming the user object has a 'name' property
    const userEmail = user.useremail;
    
    navigate(`/profilepage/${userName}/${userEmail}`)
    
  }
  return (
    <>
      {name ? (
        <div className="chat-container">
          <div id="chat-window">
            {messages.map((message, index) => (
                
              <div
                className={`chat-message ${
                  message.username === sender ? "message right" : "message left"
                }`}
                key={index}
              >
                <div className={
                    message.username === sender
                      ? "chat-image-current-user"
                      : "chat-image"
                  }>
                   
                  <img
                    src={message.username === sender ? profilePic : message.profile}
                    alt={message.username}
                    onClick={() => HandleUserClick({ name: message.username, profilePic: message.profile, useremail:message.email  })}
                  />
                </div>
                <div
                  id={
                    message.username === sender
                      ? "user-message-text"
                      : "bot-message-text"
                  }
                >
                  {message.username !== sender && <b>{message.username}:<br/></b>}
{message.message}
                </div>
              </div>
              
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="message-input"
              name="message"
              placeholder="Type your message here"
            />
            <button type="submit" id="send-button">
              Send
            </button>
          </form>
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
      
    </>
  );
}

export default ChatBox;
