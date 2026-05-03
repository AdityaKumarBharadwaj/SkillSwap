const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

// Serve frontend (only in production)
if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, '../client/dist');

    app.use(express.static(clientPath));

    // fallback for React routes
    app.use((req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
} else {
    // simple test route
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});