// API Endpoints
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const MEDIA_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || "http://localhost:5000";

export const AUTH_ENDPOINT = "/auth";
export const USERS_ENDPOINT = "/api/users";
export const CUSTOMERS_ENDPOINT = "/customers";
export const CHANGE_PASSWORD_ENDPOINT = "/auth/change-password";
export const REQUEST_RESET_ENDPOINT = "/auth/request-reset";
export const RESET_PASSWORD_ENDPOINT = "/auth/reset-password";

// Regex patterns
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/;

// Validation messages
export const VALIDATION_MESSAGES = {
  PWD_MATCH:
    "Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: !@#$%",
  PWD_REQUIRED: "Password is required",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PHONE_INVALID: "Please enter a valid phone number",
  NAME_REQUIRED: "Name is required",
  NAME_INVALID:
    "Name must be 2-50 characters long and contain only letters and spaces",
  CONFIRM_PWD_MATCH: "Passwords do not match",
};

// Course constants
export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

// API Endpoints for admin panel
export const CATEGORIES_ENDPOINT = "/api/categories";
