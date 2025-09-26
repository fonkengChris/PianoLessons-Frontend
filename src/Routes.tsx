import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import adminRoutes from "./AdminRoutes"; // Import the admin router
import ResetPassword from "./pages/ResetPassword";
import CourseDetailPage from "./pages/CourseDetailPage";
import CoursesPage from "./pages/CoursesPage";
import PricingPage from "./pages/PricingPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <Register /> },
      { path: "auth", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "contact", element: <Contact /> },
      { path: "change_password", element: <ChangePassword /> },
      { path: "users/:id", element: <UserProfile /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "payment/success", element: <PaymentSuccess /> },
      { path: "payment/cancel", element: <PaymentCancel /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: adminRoutes, // Use the children property for nested routes
  },
]);

export default router;
