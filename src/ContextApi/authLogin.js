import {React, createContext,useState, useContext, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

// import { useNavigate } from "react-router";

import {  getFirestore } from "firebase/firestore";
 export const firebaseConfig = {
   
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db =  getFirestore(app);
export default db



const provider = new GoogleAuthProvider();



const AuthContext = createContext();

export const AuthProvide = ({children})=>{
    // const navigate = useNavigate();
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
            // navigate('/homepage');


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
