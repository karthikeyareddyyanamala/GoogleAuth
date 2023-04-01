import {React, createContext,useState, useContext, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import { useNavigate } from "react-router";


const firebaseConfig = {
    apiKey: "AIzaSyBsYZPJsWVDjsq0ZcyF6tRQsaTBBrGy0f8",
    authDomain: "chat-567c3.firebaseapp.com",
    databaseURL: "https://chat-567c3-default-rtdb.firebaseio.com",
    projectId: "chat-567c3",
    storageBucket: "chat-567c3.appspot.com",
    messagingSenderId: "327861921087",
    appId: "1:327861921087:web:a94922ff248b8b96589f8a",
    measurementId: "G-ZYS96YD3VY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


const provider = new GoogleAuthProvider();



const AuthContext = createContext();

export const AuthProvide = ({children})=>{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged((user)=>{
            if(user){
                setName(user.displayName);
                setEmail(user.email);
                setProfilePic(user.photoURL);
            } else {
                setName("");
                setEmail("");
                setProfilePic("");
            }
            setLoading(false);
        })
        return unsubscribe;
    }, [])
    
    const signInWithGoogle = () => {
        
        signInWithPopup(auth, provider)
          .then((result) => {
            setName(result.user.displayName);
            setEmail(result.user.email);
            setProfilePic(result.user.photoURL);
            navigate('/homepage');


          })
          .catch((error) => {
            console.log(error);
          });
      };
      
    const sign_Out=()=>{
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          });
    };
    
    if(loading){
        return <div>Loading...</div>
    }
    
    return (
      <AuthContext.Provider value={{name, email, profilePic, signInWithGoogle, sign_Out}}>
        {children}
      </AuthContext.Provider>
    );
}


export const useAuth = ()=>{
    return useContext(AuthContext)
}
