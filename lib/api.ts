// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Response Types
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: T[];
}

// Blog Types
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  likes: number;
  views: number;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

// Contact Types
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Subscription Types
export interface SubscriptionData {
  email: string;
  source?: string;
}

// Generic API fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check content type to ensure it's JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    // Check if response is ok before parsing
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      if (isJson) {
        try {
          const data = await response.json();
          const backendError = data.error || data.message;
          if (backendError) {
            errorMessage = `Server error: ${backendError}`;
          }
        } catch (parseError) {
          // If JSON parsing fails, use default error message
          console.error('Failed to parse error response:', parseError);
        }
      } else {
        // Non-JSON error response (HTML, text, etc.)
        try {
          const text = await response.text();
          console.error('Server error response:', text.substring(0, 200));
          errorMessage = `Server error (${response.status}): Check console for details`;
        } catch {
          // Ignore if we can't read the response
        }
      }
      
      throw new Error(errorMessage);
    }

    // Parse successful response
    if (!isJson) {
      throw new Error('Server returned non-JSON response');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Blog API
export const blogApi = {
  // Get all blogs with pagination
  getBlogs: async (page = 1, limit = 10, category?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
    });
    
    return apiFetch<PaginatedResponse<Blog>>(`/blogs?${params}`);
  },

  // Get single blog by ID or slug
  getBlog: async (id: string) => {
    return apiFetch<Blog>(`/blogs/${id}`);
  },

  // Like a blog post
  likeBlog: async (id: string) => {
    return apiFetch<{ likes: number }>(`/blogs/${id}/like`, {
      method: 'PUT',
    });
  },

  // Create a new blog post (Admin)
  createBlog: async (data: {
    title: string;
    description: string;
    content: string;
    author: { name: string; email?: string };
    category: string;
    tags: string[];
    published: boolean;
    featured: boolean;
  }) => {
    return apiFetch<Blog>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Contact API
export const contactApi = {
  // Submit contact form
  submit: async (data: ContactSubmission) => {
    return apiFetch<{ message: string }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Subscription API
export const subscriptionApi = {
  // Subscribe to newsletter
  subscribe: async (email: string, source: string = 'blog') => {
    return apiFetch<{ message: string }>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ email, source }),
    });
  },
};

// Error handler utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred. Please try again.';
};

const api = {
  blogApi,
  contactApi,
  subscriptionApi,
  handleApiError,
};

export default api;
