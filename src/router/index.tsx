// import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/main/Home";
import Login from "../pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import Jobs from "@/pages/jobs/Jobs";
import Browser from "@/components/Browser";
import Profile from "@/pages/profile/Profile";
import JobDescription from "@/components/JobDescription";
// import Companies from "@/pages/admin/Companies";
// import CreateCompany from "@/pages/admin/CreateCompany";
// import CompanySetup from "@/pages/admin/CompanySetup";
// import AdminJobs from "@/pages/admin/AdminJobs";
// import CreateJob from "@/pages/admin/CreateJob";
// import JobApplicants from "@/pages/admin/JobApplicants";
import ProtectedRoute from "@/router/ProtectedRoute";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RecruiterDashboard from "@/pages/recruiter/RecruiterDashboard";
import CreateJob from "@/pages/recruiter/CreateJob";
import JobApplicants from "@/pages/recruiter/JobApplicants";
import EditJob from "@/pages/recruiter/EditJob";

const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browser", element: <Browser /> },
  { path: "/profile", element: <Profile /> },


  {
    path: "/recruiter",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <RecruiterDashboard /> },
      { path: "dashboard/create", element: <CreateJob /> },
      { path: "dashboard/:id", element: <EditJob /> },
      { path: "jobs/:id/applicants", element: <JobApplicants /> },

    ]
  }
])

// Admin Protected Routes (all children protected)
// {
//   path: "/admin",
//   element: (
//     <ProtectedRoute allowedRoles={["recruiter"]}>
//       <Outlet />
//     </ProtectedRoute>
//   ),
//   children: [
//     { path: "companies", element: <Companies /> },
//     { path: "companies/create", element: <CreateCompany /> },
//     { path: "companies/:id", element: <CompanySetup /> },
//     { path: "jobs", element: <AdminJobs /> },
//     { path: "jobs/create", element: <CreateJob /> },
//     { path: "jobs/:id/applicants", element: <JobApplicants /> },
//   ],
// },

export default router;