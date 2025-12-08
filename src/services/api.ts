import { getApiUrl } from '../config/api';

// Types for API requests and responses
export interface EnrollmentData {
  name: string;
  email: string;
  phone: string;
  city: string;
  course_title: string;
  course_price: string;
}

export interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  course?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  error?: string;
}

// Base API function with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = getApiUrl(endpoint);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Enrollment API
export const enrollmentAPI = {
  // Submit enrollment form
  submit: async (data: EnrollmentData): Promise<ApiResponse> => {
    return apiRequest('enrollments/form', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Consultation API
export const consultationAPI = {
  // Schedule consultation
  schedule: async (data: ConsultationData): Promise<ApiResponse> => {
    return apiRequest('consultation/schedule-consultation', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get available time slots for a date
  getAvailableSlots: async (date: string): Promise<ApiResponse<{ date: string; availableSlots: string[] }>> => {
    return apiRequest(`consultation/available-slots/${date}`, {
      method: 'GET',
    });
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form (POST to /api/v1/contact)
  submit: async (data: ContactData): Promise<ApiResponse> => {
    return apiRequest('contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get company contact information
  getInfo: async (): Promise<ApiResponse> => {
    return apiRequest('contact/info', {
      method: 'GET',
    });
  },

  // Get FAQ data
  getFAQ: async (category?: string): Promise<ApiResponse> => {
    const endpoint = category 
      ? `contact/faq?category=${encodeURIComponent(category)}`
      : 'contact/faq';
    
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },
};

// Health check (health endpoint is at root, not under /api/v1)
export const healthAPI = {
  check: async (): Promise<ApiResponse> => {
    const baseUrl = import.meta.env.PROD 
      ? 'https://wealth-backend-node.vercel.app'
      : 'http://localhost:5000';
    
    try {
      const response = await fetch(`${baseUrl}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },
};

// Export all APIs
export const api = {
  enrollment: enrollmentAPI,
  consultation: consultationAPI,
  contact: contactAPI,
  health: healthAPI,
};

export default api;