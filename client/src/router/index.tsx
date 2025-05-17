import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/main/Home";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
])
export default router;