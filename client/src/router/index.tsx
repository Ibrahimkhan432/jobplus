import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/main/Home";
import Login from "../pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import Jobs from "@/pages/jobs/Jobs";
import Browser from "@/components/Browser";
import Profile from "@/pages/profile/Profile";
import JobDescription from "@/components/JobDescription";
import Companies from "@/pages/admin/Companies";
import CreateCompany from "@/pages/admin/CreateCompany";
import CompanySetup from "@/pages/admin/CompanySetup";
import AdminJobs from "@/pages/admin/AdminJobs";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browser", element: <Browser /> },
  { path: "/profile", element: <Profile /> },
  
  // Admin
  { path: "/admin/companies", element: <Companies /> },
  { path: "/admin/companies/create", element: <CreateCompany /> },
  { path: "/admin/companies/:id", element: <CompanySetup /> },
  { path: "/admin/jobs", element: <AdminJobs /> },
]);

export default router;
