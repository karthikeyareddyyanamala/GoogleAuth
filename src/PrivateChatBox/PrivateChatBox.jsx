
import React from "react";

function privateChatbox(){
    

    
    return (
        <>

<div>
      {messages &&
        messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
          </div>
        ))}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
        
        </>
    )
}

export default privateChatbox