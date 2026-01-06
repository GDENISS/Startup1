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
  author: string | { name: string; email?: string };
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
  options: RequestInit = {},
  retries = 2
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(60000), // 60 second timeout for cold starts
  };

  console.log('API Request:', { url, method: config.method || 'GET' });

  try {
    const response = await fetch(url, config);
    
    console.log('API Response Status:', response.status);
    
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
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError' && retries > 0) {
      console.warn(`Request timed out. Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiFetch<T>(endpoint, options, retries - 1);
    }
    if (error instanceof Error && error.name === 'TimeoutError') {
      console.error('API Timeout:', url);
      throw new Error('Server is starting up (cold start). Please wait a moment and try again.');
    }
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

  // Track blog view
  trackView: async (slug: string) => {
    return apiFetch<{ views: number }>(`/blogs/${slug}/view`, {
      method: 'POST',
    });
  },

  // Like/unlike a blog post
  likeBlog: async (slug: string) => {
    return apiFetch<{ likes: number }>(`/blogs/${slug}/like`, {
      method: 'POST',
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
