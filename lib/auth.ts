"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to protect admin routes
 * Redirects to login page if user is not authenticated
 */
export function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const getUser = () => {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('admin_token');
  };

  return { logout, getUser, isAuthenticated };
}

/**
 * Get authentication token for API requests
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

/**
 * Check if user is authenticated (client-side only)
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('admin_token');
}
