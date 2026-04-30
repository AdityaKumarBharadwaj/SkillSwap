const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const path = require('path');

// 1. Load environment variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware (The Gatekeepers)
app.use(express.json());    // Allows server to accept JSON data in body
app.use(cors());        // Allows React to talk to this server
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

// 4. Serve Frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../client', 'dist', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});