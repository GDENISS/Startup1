"use client";

import React from 'react';
import { Eye, Heart } from 'lucide-react';

interface BlogStatsProps {
  views: number;
  likes: number;
  isLiked: boolean;
  isLiking: boolean;
  onLike: () => void;
  className?: string;
  showLabels?: boolean;
}

/**
 * Reusable component to display blog statistics (views and likes)
 * Includes interactive like button with optimistic UI updates
 */
export function BlogStats({
  views,
  likes,
  isLiked,
  isLiking,
  onLike,
  className = '',
  showLabels = false,
}: BlogStatsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Views */}
      <div className="flex items-center gap-1.5 text-neutral-500">
        <Eye className="h-4 w-4" />
        <span className="text-xs font-medium">
          {views.toLocaleString()}
          {showLabels && ' views'}
        </span>
      </div>

      {/* Likes */}
      <button
        onClick={onLike}
        disabled={isLiking}
        className={`flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isLiked ? 'text-rose-500' : 'text-neutral-500 hover:text-rose-500'
        }`}
        aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
      >
        <Heart 
          className={`h-4 w-4 transition-all ${
            isLiked ? 'fill-rose-500' : ''
          }`}
        />
        <span className="text-xs font-medium">
          {likes.toLocaleString()}
          {showLabels && ' likes'}
        </span>
      </button>
    </div>
  );
}
