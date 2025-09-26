// Authentication types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// User types
export interface UserPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Customer types
export interface CustomerPayload {
  name: string;
  email: string;
  phone?: string;
  country?: string;
}

export interface CustomerUpdateFormData {
  country?: string;
  phone?: string;
  name?: string;
  email?: string;
}

// Password change types
export interface PasswordChangeData {
  old_password: string;
  password: string;
}

// Reset password types
export interface ResetPasswordData {
  email: string;
}

export interface ResetPasswordConfirmData {
  token: string;
  password: string;
}

// Language form types
export interface LanguageFormData {
  name: string;
  code: string;
}

// Course form types
export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  imageUrl?: string;
}

// Lesson form types
export interface LessonFormData {
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
}

// Review form types
export interface ReviewFormData {
  userId: string;
  courseId: string;
  rating: number;
  comment?: string;
}

// Subscription form types
export interface SubscriptionFormData {
  userId: string;
  endDate: string;
  status: string;
  paymentId?: string;
}

// Category form types
export interface CategoryFormData {
  name: string;
  description?: string;
}

// Song form types
export interface SongFormData {
  title: string;
  artist: string;
  category: string;
  difficulty: string;
  price: number;
  isPremium: boolean;
}
