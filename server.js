const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // For frontend connection
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173", // local React dev server
    "https://movie-review-client-seven.vercel.app" // Vercel deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const uploadRoutes = require("./src/routes/uploadRoutes");

app.use('/api/users', userRoutes);   // User Routes
app.use('/api/movies', movieRoutes); // Movie Routes
app.use('/api/reviews', reviewRoutes); // Review Routes
app.use("/api/upload", uploadRoutes); // Upload Routes

// Home Route
app.get('/', (req, res) => {
  res.send('<h1>Movie Review API Running</h1>');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

app.listen(port, () => console.log(`🚀 Server running on PORT ${port}...`));
