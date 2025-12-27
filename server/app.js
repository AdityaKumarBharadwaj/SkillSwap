const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// 1. Load environment variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware (The Gatekeepers)
app.use(express.json());    // Allows server to accept JSON data in body
app.use(cors());        // Allows React to talk to this server
app.use('/api/auth', authRoutes);

// 4. API routes
app.get('/', (req, res) => {
    res.send('Api is running....');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});