# Backend Deployment Guide

## Required Environment Variables

The following environment variables must be configured on Render:

### 1. MONGODB_URI
Your MongoDB Atlas connection string
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```
**Get this from**: MongoDB Atlas → Clusters → Connect → Connect your application

### 2. JWT_SECRET
Secret key for JWT token generation (use a long random string)
```
your-super-secret-jwt-key-change-this-in-production
```
**Generate a secure random string for production**

### 3. JWT_EXPIRES_IN
JWT token expiration time
```
7d
```

### 4. HUGGING_FACE_API_KEY
Hugging Face API key for AI predictions
```
hf_your_hugging_face_api_key_here
```
**Get this from**: https://huggingface.co/settings/tokens

### 5. AI_SERVICE_URL
URL for AI service (if external)
```
http://localhost:8000
```

### 6. PORT
Port for the server (Render uses 10000)
```
10000
```

## How to Set Environment Variables on Render

1. Go to https://dashboard.render.com
2. Select your **disease-prediction-app-backend** service
3. Click **"Environment"** in the left sidebar
4. Click **"Add Environment Variable"** for each variable above
5. Copy the **Key** and **Value** exactly as shown
6. Click **"Save Changes"** at the top
7. Wait for automatic redeployment (~2-3 minutes)

## Verifying Deployment

After deployment, check the logs for:
```
MongoDB Connected: cluster0.vj11t.mongodb.net
Backend server running on http://localhost:10000
```

If you see:
```
MongoDB Connection Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

Then the environment variables were not set correctly. Double-check each variable name and value.

## Security Notes

⚠️ **IMPORTANT**: After successful deployment, rotate these credentials:
1. Change MongoDB password in MongoDB Atlas
2. Generate new Hugging Face API key
3. Update JWT_SECRET to a secure random string
4. Update environment variables on Render with new values
