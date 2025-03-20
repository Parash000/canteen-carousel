
import { toast } from "sonner";

// Base API URL - replace with your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:5000/api';

// Helper for handling API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  return Promise.reject(error);
};

// Generic fetch function with error handling
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw { response: { data } };
    }
    
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Menu Items API
export const menuApi = {
  getAll: () => fetchApi('/menu'),
  getByCategory: (category: string) => fetchApi(`/menu/category/${category}`),
  getById: (id: string) => fetchApi(`/menu/${id}`),
};

// Orders API
export const ordersApi = {
  create: (orderData: any) => fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  getByUser: (userId: string) => fetchApi(`/orders/user/${userId}`),
  getById: (id: string) => fetchApi(`/orders/${id}`),
  updateStatus: (id: string, status: string) => fetchApi(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
};
