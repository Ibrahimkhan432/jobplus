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
import CreateJob from "@/pages/admin/CreateJob";
import JobApplicants from "@/pages/admin/JobApplicants";

// ...existing imports...
import ProtectedRoute from "@/router/ProtectedRoute";

const router = createBrowserRouter([
  // Protected routes

  // Public Routes
  { path: "/", element: <Home /> },
  {
    path: "/signup",
    element: (
      <ProtectedRoute>
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browser", element: <Browser /> },
  { path: "/profile", element: <Profile /> },

  // Admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CreateCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <CreateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <JobApplicants />
      </ProtectedRoute>
    ),
  },
]);

export default router;
