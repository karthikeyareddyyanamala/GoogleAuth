import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Login from './Login/Login';
import HomePage from "./HomePage/HomePage";
import ErrorElement from "./ErrorElement/ErrorElement";
import { AuthProvide } from "./ContextApi/authLogin";


const router = createBrowserRouter([
  {path:'/',
  element:<Login></Login>,
  errorElement:<ErrorElement></ErrorElement>},
  {path:'/homepage',
  element:<HomePage></HomePage>,
  errorElement:<ErrorElement></ErrorElement>}
  
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