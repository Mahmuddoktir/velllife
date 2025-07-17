# CORS Issue Fixed! 🎉

## What Was the Problem?

You were getting this error:
```
Access to fetch at 'https://job-portal-production-c0a1.up.railway.app/api/v1/users/sign-up' 
from origin 'http://localhost:5175' has been blocked by CORS policy
```

This is a **CORS (Cross-Origin Resource Sharing)** error. The API server wasn't configured to allow requests from your local development server.

## How I Fixed It

### 1. **Added Vite Proxy Configuration**
I updated `vite.config.js` to include a proxy that forwards API requests:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://job-portal-production-c0a1.up.railway.app',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
    },
  },
}
```

### 2. **Updated API Configuration**
I modified `src/utils/api.js` to use the proxy in development:

```javascript
const getApiUrl = (endpoint) => {
  if (import.meta.env.DEV) {
    // Use Vite proxy in development (avoids CORS issues)
    return `/api${endpoint}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};
```

## How It Works

1. **In Development**: Your API calls go to `/api/users/sign-up` instead of the full URL
2. **Vite Proxy**: Intercepts these requests and forwards them to the real API server
3. **No CORS Issues**: Since the proxy is on the same origin as your app, no CORS problems
4. **In Production**: Uses the full API URL directly

## What You Need to Do

1. **Restart your development server** (if not already done):
   ```bash
   npm run dev
   ```

2. **Try registering again** - it should work now!

3. **Check the browser console** - you should see successful API calls

## Testing

You can test the fix by:
1. Going to the registration page
2. Filling out the form
3. Submitting - it should work without CORS errors
4. Check the browser console for successful API calls

## Alternative Solutions (for reference)

### Option 1: Fix Backend CORS (Best Long-term Solution)
The API server needs to add these headers:
```
Access-Control-Allow-Origin: http://localhost:5175
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Option 2: Use a CORS Proxy (Temporary)
You could use services like `cors-anywhere.herokuapp.com`, but Vite's proxy is better for development.

## Why This Solution is Better

✅ **No external dependencies** - uses Vite's built-in proxy
✅ **Development only** - doesn't affect production
✅ **Secure** - requests go through your development server
✅ **Fast** - no additional network hops
✅ **Reliable** - doesn't depend on external services

## Next Steps

1. **Test the registration** - it should work now
2. **Test other API calls** - login, job listings, etc.
3. **For production** - make sure the backend has proper CORS configuration

The CORS issue should now be resolved! 🚀 