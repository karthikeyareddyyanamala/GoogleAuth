import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Login from './Login/Login';
import HomePage from "./HomePage/HomePage";
import ErrorElement from "./ErrorElement/ErrorElement";
import { AuthProvide } from "./ContextApi/authLogin";
import ChatBox from "./ChatBox/ChatBox";
import ProfilePage from "./ProfilePage/ProfilePage";
import PaymentSuccessPage from "./PaymentSuccessPage/PaymentSuccessPage";
import ChatRoom from "./PrivateChatBox/PrivateChatBox";
const router = createBrowserRouter([
  {path:'/',
  element:<Login></Login>,
  errorElement:<ErrorElement></ErrorElement>},
  {path:'/homepage',
  element:<HomePage></HomePage>,
  errorElement:<ErrorElement></ErrorElement>},
  {path:'/*',
  element:<Login></Login>},
  {path:'/chatbox',
  element:<ChatBox></ChatBox>},
  {path:'/Paymentsuccess/:randomString',
  element:<PaymentSuccessPage></PaymentSuccessPage>},
  {
    path:'/profilepage/:userName/:userEmail',
    element:<ProfilePage></ProfilePage>
  },
  {
    path:'/privateChatbox',
    element:<ChatRoom></ChatRoom>
  }
  
  
])
function App() {
  
  return (
    <AuthProvide>
      <RouterProvider router={router}>
     
      </RouterProvider>
    </AuthProvide>
  );
}

export default App