'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAdminAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    router.push('/admin/login');
  };

  const getUser = () => {
    try {
      const userStr = localStorage.getItem('auth_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token');
  };

  return { logout, getUser, isAuthenticated };
};

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth_token');
};
