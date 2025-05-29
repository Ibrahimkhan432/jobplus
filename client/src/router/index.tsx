import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/main/Home";
import Login from "../pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import Jobs from "@/pages/jobs/Jobs";
import Browser from "@/components/Browser";
import Profile from "@/pages/profile/Profile";
import JobDescription from "@/components/JobDescription";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browser", element: <Browser /> },
  { path: "/profile", element: <Profile /> },
]);
export default router;
