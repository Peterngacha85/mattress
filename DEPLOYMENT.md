# Kisau Mattress - Deployment Guide

This guide explains how to deploy the application to **Vercel** (Frontend) and **Render** (Backend).

## 1. Backend Deployment (Render)

1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Set the Root Directory to `Backend`.
4. Render will automatically detect the settings from `render.yaml`.
5. **Environment Variables**: Add the following keys manually in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A long random string.
   - `CLOUDINARY_CLOUD_NAME`: From Cloudinary.
   - `CLOUDINARY_API_KEY`: From Cloudinary.
   - `CLOUDINARY_API_SECRET`: From Cloudinary.
   - `ADMIN_EMAIL`: Your login email.
   - `ADMIN_PASSWORD`: Your login password.
   - `FRONTEND_URL`: The URL of your Vercel deployment (e.g., `https://kisau-mattresses.vercel.app`).

## 2. Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. Select the `Frontend` directory as the project root.
3. **Environment Variables**: Add the following key:
   - `VITE_API_URL`: The URL of your Render backend + `/api` (e.g., `https://kisau-backend.onrender.com/api`).
4. Vercel will build the project using the `vercel.json` configuration provided.

## 3. Post-Deployment Checks

- Ensure the `FRONTEND_URL` in Render matches your actual Vercel URL (including `https://`).
- Ensure the `VITE_API_URL` in Vercel ends with `/api`.
- Test the Login and Product management to verify full connectivity.
