# Timeout Error Debugging Guide

## Problem
```
❌ Error fetching user profile: 
AxiosError {message: 'timeout of 5000ms exceeded', name: 'AxiosError', code: 'ECONNABORTED', ...}
```

## ✅ Solutions Implemented

### 1. **Increased Timeout Values**
- **Before**: 5 seconds
- **After**: 20 seconds for profile requests
- **Reason**: Profile requests may include large image data from Cloudinary

### 2. **Added Retry Logic**
- **Automatic retries**: Up to 2 retries with exponential backoff
- **Smart retry**: Only retries on network errors, not client errors (4xx)
- **Delay**: 1.5 seconds between retries

### 3. **Better Error Handling**
- **Specific error codes**: TIMEOUT, UNAUTHORIZED, NOT_FOUND, SERVER_ERROR
- **Detailed logging**: Request/response interceptors for debugging
- **User-friendly messages**: Clear error descriptions

### 4. **API Client Improvements**
- **Centralized configuration**: Single axios instance with consistent settings
- **Request/Response interceptors**: Automatic logging and error handling
- **Input validation**: Checks for required parameters before making requests

## 🔧 How to Debug Further

### Step 1: Use the Debug Utility
```javascript
import { quickDebug, debugUserProfile } from './src/utils/apiDebugger.js';

// Test basic connectivity
await quickDebug();

// Test specific user profile
const userId = 'your-user-id';
const token = localStorage.getItem('token');
await debugUserProfile(userId, token);
```

### Step 2: Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to fetch user profile
4. Look for:
   - Request duration
   - Response status
   - Response size
   - Any failed requests

### Step 3: Check Console Logs
Look for these log messages:
- `🔄 API Request: GET /profile/{userId}`
- `✅ API Response: 200 /profile/{userId}`
- `❌ Response interceptor error:`

### Step 4: Verify Environment
```javascript
console.log('API Base URL:', import.meta.env.VITE_API_URL);
console.log('Token present:', !!localStorage.getItem('token'));
console.log('User ID:', user?.id);
```

## 🚨 Common Causes & Solutions

### 1. **Slow Backend Response**
**Cause**: Database queries or Cloudinary operations taking too long
**Solution**: ✅ Increased timeout to 20 seconds

### 2. **Network Connectivity Issues**
**Cause**: Poor internet connection or network instability
**Solution**: ✅ Added retry logic with exponential backoff

### 3. **Large Profile Images**
**Cause**: High-resolution profile pictures from Cloudinary
**Solution**: ✅ Increased timeout for profile requests specifically

### 4. **Authentication Issues**
**Cause**: Invalid or expired tokens
**Solution**: ✅ Better error handling with specific UNAUTHORIZED errors

### 5. **Server Overload**
**Cause**: Backend server under heavy load
**Solution**: ✅ Retry logic and better error messages

## 📊 Monitoring

### Success Indicators
- `✅ User profile fetched successfully for ID: {userId}`
- Response time < 10 seconds
- No retry attempts needed

### Warning Signs
- `Attempt 2 failed:` (retry happening)
- Response time > 15 seconds
- Multiple timeout errors

### Error Patterns
- `ECONNABORTED`: Network timeout
- `401 Unauthorized`: Token issues
- `404 Not Found`: User doesn't exist
- `500+ Server Error`: Backend issues

## 🔄 Next Steps if Issues Persist

1. **Check Backend Logs**: Look for slow database queries
2. **Monitor Cloudinary**: Check if image processing is slow
3. **Network Analysis**: Use tools like Pingdom or GTmetrix
4. **Database Optimization**: Add indexes for user queries
5. **CDN Configuration**: Optimize Cloudinary settings

## 🛠️ Quick Fixes to Try

### Temporary Workaround
```javascript
// In browser console, test direct API call
const token = localStorage.getItem('token');
const userId = 'your-user-id';

fetch(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
}).then(r => r.json()).then(console.log);
```

### Clear Cache and Retry
```javascript
// Clear any cached data
localStorage.removeItem('userData');
localStorage.removeItem('user');

// Refresh the page and try again
window.location.reload();
```

The timeout issue should now be resolved with the improved error handling, retry logic, and increased timeout values. If problems persist, use the debugging utilities to identify the specific cause.
