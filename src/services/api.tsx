import axios from "axios";
import Course from "../entities/Course";
import User from "../entities/User";
import Category from "../entities/Category";
import Lesson from "../entities/Lesson";
import { Subscription } from "../entities/Subscription";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ accessToken: string; user: User }>("/auth", credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post<{ accessToken: string; user: User }>("/users", userData),
};

export const courseApi = {
  getAll: () => api.get<{ courses: Course[]; total: number; pages: number; currentPage: number }>("/courses"),
  getById: (id: string) => api.get<Course>(`/courses/${id}`),
  create: (course: Omit<Course, "_id" | "createdAt" | "updatedAt">) =>
    api.post<Course>("/courses", course),
  update: (id: string, course: Partial<Course>) =>
    api.put<Course>(`/courses/${id}`, course),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

export const userApi = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (user: { name: string; email: string; password: string; role?: string }) =>
    api.post<User>("/users", user),
  update: (id: string, user: Partial<User>) =>
    api.put<User>(`/users/${id}`, user),
  delete: (id: string) => api.delete(`/users/${id}`),
  getCurrentUser: () => api.get<User>("/auth/me"),
};

export const categoryApi = {
  getAll: () => api.get<Category[]>("/categories"),
  getById: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) =>
    api.post<Category>("/categories", category),
  update: (id: string, category: Partial<Category>) =>
    api.put<Category>(`/categories/${id}`, category),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export const lessonApi = {
  getAll: (params?: { courseId?: string }) =>
    api.get<Lesson[]>("/lessons", { params }),
  getById: (id: string) => api.get<Lesson>(`/lessons/${id}`),
  create: (lesson: Omit<Lesson, "_id" | "createdAt" | "updatedAt">) =>
    api.post<Lesson>("/lessons", lesson),
  update: (id: string, lesson: Partial<Lesson>) =>
    api.put<Lesson>(`/lessons/${id}`, lesson),
  delete: (id: string) => api.delete(`/lessons/${id}`),
  getByCourse: (courseId: string) =>
    api.get<Lesson[]>(`/lessons/course/${courseId}`),
};



export const subscriptionApi = {
  getAll: () => api.get<Subscription[]>("/subscriptions"),
  getById: (id: string) => api.get<Subscription>(`/subscriptions/${id}`),
  create: (subscription: Omit<Subscription, "id">) =>
    api.post<Subscription>("/subscriptions", subscription),
  update: (id: string, subscription: Partial<Subscription>) =>
    api.put<Subscription>(`/subscriptions/${id}`, subscription),
  delete: (id: string) => api.delete(`/subscriptions/${id}`),
  getByUser: (userId: string) =>
    api.get<Subscription[]>(`/subscriptions/user/${userId}`),
  activate: (id: string) =>
    api.put<Subscription>(`/subscriptions/${id}/activate`),
  deactivate: (id: string) =>
    api.put<Subscription>(`/subscriptions/${id}/deactivate`),
};

// Legacy support - keep these for backward compatibility
export const loginUser = async (email: string, password: string) => {
  const res = await authApi.login({ email, password });
  localStorage.setItem("token", res.data.accessToken);
  return res.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  return await authApi.register({ name, email, password });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const contactApi = {
  submit: (contactData: { name: string; email: string; subject: string; message: string; userId?: string }) =>
    api.post<{ message: string; referenceId: string; confirmationJobId: string; adminJobId: string }>("/emails/contact", contactData),
};
