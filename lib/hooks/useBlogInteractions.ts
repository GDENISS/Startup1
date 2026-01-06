"use client";

import { useEffect, useState, useCallback } from 'react';
import { blogApi, handleApiError } from '@/lib/api';

interface UseBlogInteractionsProps {
  blogId: string;
  slug: string;
  initialViews?: number;
  initialLikes?: number;
}

interface BlogInteractionState {
  views: number;
  likes: number;
  isLiked: boolean;
  isLiking: boolean;
  error: string | null;
}

/**
 * Custom hook to manage blog view tracking and like functionality
 * Automatically tracks views on mount and provides like toggle functionality
 */
export function useBlogInteractions({
  blogId,
  slug,
  initialViews = 0,
  initialLikes = 0,
}: UseBlogInteractionsProps) {
  const [state, setState] = useState<BlogInteractionState>(() => {
    // Initialize isLiked from localStorage
    const likedKey = `blog_liked_${blogId}`;
    const isLiked = typeof window !== 'undefined' 
      ? localStorage.getItem(likedKey) === 'true'
      : false;
    
    return {
      views: initialViews,
      likes: initialLikes,
      isLiked,
      isLiking: false,
      error: null,
    };
  });

  // Track view on component mount
  useEffect(() => {
    const trackView = async () => {
      try {
        // Check if already viewed in this session
        const viewedKey = `blog_viewed_${slug}`;
        const hasViewed = sessionStorage.getItem(viewedKey);
        
        if (!hasViewed) {
          await blogApi.trackView(slug);
          sessionStorage.setItem(viewedKey, 'true');
          setState(prev => ({ ...prev, views: prev.views + 1 }));
        }
      } catch (error) {
        console.error('Failed to track view:', handleApiError(error));
      }
    };

    trackView();
  }, [slug]);

  // Toggle like functionality
  const toggleLike = useCallback(async () => {
    setState(prev => ({ ...prev, isLiking: true, error: null }));
    
    try {
      const response = await blogApi.likeBlog(slug);
      const likedKey = `blog_liked_${blogId}`;
      const newLikedState = !state.isLiked;
      
      // Update local storage
      if (newLikedState) {
        localStorage.setItem(likedKey, 'true');
      } else {
        localStorage.removeItem(likedKey);
      }
      
      setState(prev => ({
        ...prev,
        likes: response.data?.likes ?? (newLikedState ? prev.likes + 1 : prev.likes - 1),
        isLiked: newLikedState,
        isLiking: false,
      }));
    } catch (error) {
      const errorMessage = handleApiError(error);
      setState(prev => ({ 
        ...prev, 
        isLiking: false, 
        error: errorMessage 
      }));
      console.error('Failed to toggle like:', errorMessage);
    }
  }, [blogId, slug, state.isLiked]);

  return {
    views: state.views,
    likes: state.likes,
    isLiked: state.isLiked,
    isLiking: state.isLiking,
    error: state.error,
    toggleLike,
  };
}
