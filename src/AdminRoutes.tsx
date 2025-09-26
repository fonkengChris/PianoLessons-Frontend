import React from "react";
import { RouteObject } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

// Import admin management pages
import UsersManagementPage from "./pages/admin/UsersManagementPage";
import UserFormPage from "./pages/admin/UserFormPage";
import CoursesManagementPage from "./pages/admin/CoursesManagementPage";
import CourseFormPage from "./pages/admin/CourseFormPage";
import CategoriesManagementPage from "./pages/admin/CategoriesManagementPage";
import CategoryFormPage from "./pages/admin/CategoryFormPage";
import LessonsManagementPage from "./pages/admin/LessonsManagementPage";
import LessonFormPage from "./pages/admin/LessonFormPage";

// Simple placeholder components for remaining admin pages
const AdminDashboard = () => (
  <Box p={8}>
    <Heading color="blue.600">Admin Dashboard</Heading>
    <Text mt={4} color="gray.600">Welcome to the admin panel. Select an option from the sidebar to get started.</Text>
  </Box>
);

const CustomersManagement = () => (
  <Box p={8}>
    <Heading>Customers Management</Heading>
    <Text mt={4}>Manage customers here</Text>
  </Box>
);

const NotationsManagement = () => (
  <Box p={8}>
    <Heading>Notations Management</Heading>
    <Text mt={4}>Manage notations here</Text>
  </Box>
);

const MediaFilesManagement = () => (
  <Box p={8}>
    <Heading>Media Files Management</Heading>
    <Text mt={4}>Manage media files here</Text>
  </Box>
);

const VideosManagement = () => (
  <Box p={8}>
    <Heading>Videos Management</Heading>
    <Text mt={4}>Manage videos here</Text>
  </Box>
);

const BlogManagement = () => (
  <Box p={8}>
    <Heading>Blog Management</Heading>
    <Text mt={4}>Manage blog posts here</Text>
  </Box>
);

const PaymentsManagement = () => (
  <Box p={8}>
    <Heading>Payments Management</Heading>
    <Text mt={4}>Manage payments here</Text>
  </Box>
);

// Define admin routes
const adminRoutes: RouteObject[] = [
  { index: true, element: <AdminDashboard /> },
  
  // Users management
  { path: "users", element: <UsersManagementPage /> },
  { path: "users/add", element: <UserFormPage /> },
  { path: "users/edit/:id", element: <UserFormPage /> },
  
  // Customers management
  { path: "customers", element: <CustomersManagement /> },
  
  // Categories management
  { path: "category", element: <CategoriesManagementPage /> },
  { path: "category/add", element: <CategoryFormPage /> },
  { path: "category/edit/:id", element: <CategoryFormPage /> },
  
  // Courses management
  { path: "courses", element: <CoursesManagementPage /> },
  { path: "courses/add", element: <CourseFormPage /> },
  { path: "courses/edit/:id", element: <CourseFormPage /> },
  
  // Lessons management
  { path: "lessons", element: <LessonsManagementPage /> },
  { path: "lessons/add", element: <LessonFormPage /> },
  { path: "lessons/edit/:id", element: <LessonFormPage /> },
  
  
];

export default adminRoutes;
