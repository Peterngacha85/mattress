# Kisau Mattress - Deployment Guide (Manual Setup)

This guide explains how to deploy the Backend and Frontend independently.

## 1. Backend Deployment (Render or cPanel)

### Render Setup
1. Create a new **Web Service**.
2. **Build Command**: `npm install --legacy-peer-deps`
3. **Start Command**: `node server.js`
4. **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A long random string.
   - `CLOUDINARY_CLOUD_NAME`: From Cloudinary.
   - `CLOUDINARY_API_KEY`: From Cloudinary.
   - `CLOUDINARY_API_SECRET`: From Cloudinary.
   - `ADMIN_EMAIL`: Your login email.
   - `ADMIN_PASSWORD`: Your login password.
   - `FRONTEND_URL`: Your Vercel URL (e.g., `https://kisau-mattresses.vercel.app`).

### cPanel Setup
1. Use the **Node.js Selector** to create a new application.
2. Select the `Backend` folder as your directory.
3. Use `index.js` or `server.js` as the Application startup file.
4. Set the environment variables in the cPanel interface or by placing a `.env` file in the folder.

---

## 2. Frontend Deployment (Vercel)

1. Connect your repository to Vercel and select the `Frontend` folder.
2. **Environment Variables**:
   - `VITE_API_URL`: Your Backend URL (e.g., `https://mattress.onrender.com/api`).
3. Vercel will build and host your website independently.

---

## Technical Summary
- The **Backend** is a pure API. Visiting its URL directly will only show "Kisau Mattress API is running".
- The **Frontend** talks to the Backend via cross-origin requests (CORS).
