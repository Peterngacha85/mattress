const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.send('Kisau Mattress API is running...');
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Check possible locations for the dist folder
    const siblingDist = path.join(__dirname, '../Frontend/dist');
    const localDist = path.join(__dirname, './dist');
    
    const distPath = require('fs').existsSync(localDist) ? localDist : siblingDist;

    app.use(express.static(distPath));

    app.get('/:path*', (req, res) =>
        res.sendFile(path.resolve(distPath, 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running in development mode...');
    });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
