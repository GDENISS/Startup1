# Backend Integration Guide

## Overview
All frontend forms are now integrated with the backend API running at `http://localhost:5000/api`.

## Environment Setup

Create a `.env.local` file (already created) with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, update this to:
```
NEXT_PUBLIC_API_URL=https://akoot-backend.onrender.com/api
```

**Note**: The `.env.production` file is already configured with the production URL and will be used automatically when you deploy.

## API Service Layer

### Location
`lib/api.ts` - Central API service handling all backend communication

### Features
- TypeScript interfaces for type safety
- Centralized error handling
- Generic fetch wrapper with proper error responses
- Rate limiting aware (client-side status handling)

### Available APIs

#### 1. Blog API
```typescript
import { blogApi } from '@/lib/api';

// Get paginated blogs
const response = await blogApi.getBlogs(page, limit);

// Get single blog by slug
const blog = await blogApi.getBlog(slug);

// Like a blog post
await blogApi.likeBlog(id);
```

#### 2. Contact API
```typescript
import { contactApi } from '@/lib/api';

// Submit contact form
await contactApi.submit({
  name: string,
  email: string,
  subject: string,
  message: string
});
```

#### 3. Subscription API
```typescript
import { subscriptionApi } from '@/lib/api';

// Subscribe to newsletter/waitlist
await subscriptionApi.subscribe(email, source);
// source: "blog" | "e-rates"
```

## Integrated Pages

### 1. Contact Form (`app/contact/page.tsx`)
- **Endpoint**: POST `/api/contacts`
- **Rate Limit**: 5 submissions per 15 minutes
- **Features**:
  - Form validation
  - Success/error messages
  - Loading states
  - Automatic error handling

### 2. Blog Page (`app/blog/page.tsx`)
- **Endpoints**: 
  - GET `/api/blogs` - List all blogs
  - POST `/api/subscriptions` - Newsletter signup
- **Rate Limit**: 3 subscriptions per hour
- **Features**:
  - Dynamic blog loading with skeleton states
  - Error handling with retry
  - Empty state messaging
  - Newsletter subscription
  - Date formatting

### 3. E-Rates Waitlist (`app/e-rates/page.tsx`)
- **Endpoint**: POST `/api/subscriptions`
- **Rate Limit**: 3 subscriptions per hour
- **Features**:
  - Email validation
  - Success/error feedback
  - Loading states
  - Source tracking (e-rates)

## Error Handling

The `handleApiError` utility provides user-friendly error messages:

```typescript
import { handleApiError } from '@/lib/api';

try {
  // API call
} catch (err) {
  const message = handleApiError(err);
  // Display message to user
}
```

### Error Types Handled
- Network errors
- Rate limiting (429)
- Validation errors (400)
- Server errors (500)
- Unknown errors

## Testing

### Start Backend
```bash
cd backend
npm start
# Backend runs on http://localhost:5000
```

### Start Frontend
```bash
cd Startup
pnpm dev
# Frontend runs on http://localhost:3000
```

### Test Scenarios

1. **Contact Form**
   - Navigate to `/contact`
   - Fill in all fields
   - Submit and verify success message
   - Try 6 submissions quickly to test rate limiting

2. **Blog Page**
   - Navigate to `/blog`
   - Verify blogs load from API
   - Test newsletter subscription
   - Try 4 subscriptions quickly to test rate limiting

3. **E-Rates Waitlist**
   - Navigate to `/e-rates`
   - Submit email for waitlist
   - Verify success message
   - Check backend logs for "e-rates" source

## Rate Limiting

The backend implements rate limiting:
- **Contact submissions**: 5 per 15 minutes per IP
- **Subscriptions**: 3 per hour per IP

Frontend handles 429 responses gracefully with:
- User-friendly messages
- Automatic retry suggestions
- Clear error feedback

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 20,
  "total": 100,
  "page": 1,
  "pages": 5,
  "data": [ ... ]
}
```

## Future Enhancements

### Authentication (Not Yet Implemented)
- JWT tokens ready to implement
- Admin routes exist but unprotected
- Add login/logout functionality
- Protect admin dashboard

### Admin Dashboard
- View all contacts
- Manage blog posts
- View subscribers
- Analytics

### Individual Blog Posts
- Create `/blog/[slug]` dynamic route
- Use `blogApi.getBlog(slug)`
- Implement like functionality

## Production Deployment

1. Update `.env.local` to `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://api.akoot.tech/api
   ```

2. Ensure backend is deployed and running

3. Build frontend:
   ```bash
   pnpm build
   pnpm start
   ```

4. Test all forms in production environment

## Support

For issues or questions about the backend integration:
- Check backend logs
- Verify environment variables
- Test API endpoints directly with Postman/curl
- Check rate limiting status
