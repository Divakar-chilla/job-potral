import { createBrowserRouter } from "react-router-dom";

import Register from "../register/Register";
import Verifyotp from "../register/Verifyotp";

import SpinnerLoader from "../loaders/SpinnerLoader";
import Home from "../home/Home";

import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import Login from "../login/login";


let Routes = createBrowserRouter(
    [
       {
        path:"/Login",
        element:<Login></Login>
       },{
        path:"/",
        element:<Register></Register>
       },
       {
        path:'/verifyotp',
        element:<Verifyotp></Verifyotp>
       },{
       path:'/home',
       element:<PrivateRoutes><Home></Home></PrivateRoutes>
       }    
    
    ]

)

export default Routes;