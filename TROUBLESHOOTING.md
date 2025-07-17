# API Connection Troubleshooting Guide

## 🚨 "Network error: Unable to connect to the server" Issue

If you're getting this error when trying to register or use the application, follow these steps:

### Step 1: Test API Connectivity

1. **Open your browser's Developer Tools** (F12)
2. **Go to the Console tab**
3. **Visit the home page** and click "Test Connectivity" in the API Test component
4. **Check the console output** for detailed error messages

### Step 2: Common Solutions

#### Option A: API Server is Down
If the connectivity test fails:
- The API server at `https://job-portal-production-c0a1.up.railway.app` might be temporarily down
- Try again in a few minutes
- Contact the API provider if the issue persists

#### Option B: CORS Issues
If you see CORS errors in the console:
- The API server is not configured to allow requests from your domain
- This is a server-side configuration issue
- Contact the API provider to enable CORS for your domain

#### Option C: Wrong API URL
If the API URL has changed:
1. **Update the API_BASE_URL** in `src/utils/api.js`
2. **Replace the current URL** with the correct one
3. **Restart your development server**

### Step 3: Alternative API URLs to Try

If the current API is not working, you can try these alternatives:

```javascript
// Option 1: Local development server (if you have one)
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Option 2: Different Railway deployment
const API_BASE_URL = 'https://your-new-railway-app.up.railway.app/api/v1';

// Option 3: Other hosting platforms
const API_BASE_URL = 'https://your-api.herokuapp.com/api/v1';
```

### Step 4: Debug Information

When testing, look for these details in the browser console:

```
API Call: { url: "...", method: "POST", headers: {...} }
API Response: { status: 200, statusText: "OK", url: "..." }
API Response Data: { ... }
```

### Step 5: Manual Testing

You can manually test the API using curl or Postman:

```bash
# Test registration endpoint
curl -X POST https://job-portal-production-c0a1.up.railway.app/api/v1/users/sign-up \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","role":"jobseeker"}'
```

### Step 6: Environment Variables (Recommended)

For better configuration management, create a `.env` file:

```env
VITE_API_BASE_URL=https://job-portal-production-c0a1.up.railway.app/api/v1
```

Then update `src/utils/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://job-portal-production-c0a1.up.railway.app/api/v1';
```

### Step 7: Check Network Tab

1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Try to register**
4. **Look for the failed request**
5. **Check the request details** (Headers, Response, etc.)

### Common Error Messages and Solutions

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| "Network error: Unable to connect" | Server down or unreachable | Check server status, try alternative URL |
| "CORS error" | Server not allowing cross-origin requests | Contact API provider |
| "404 Not Found" | Wrong endpoint URL | Check API documentation |
| "401 Unauthorized" | Missing or invalid authentication | Check token/credentials |
| "500 Internal Server Error" | Server-side error | Contact API provider |

### Still Having Issues?

1. **Check the browser console** for detailed error messages
2. **Try the API Test component** on the home page
3. **Verify your internet connection**
4. **Try a different browser**
5. **Contact the API provider** with the error details

### Quick Fix: Use Mock Data (Temporary)

If you need to test the frontend while the API is down, you can temporarily enable mock data by commenting out the API calls and using local data. 