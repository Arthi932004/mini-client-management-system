const express = require("express");
const cors = require("cors");
require("dotenv").config();

const protect = require("./middleware/authMiddleware");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();

// CORS configuration
app.use(
cors({
origin: "http://localhost:5173",
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"]
})
);

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

// Home route
app.get("/", (req, res) => {
res.send("Client Management System API is Running!");
});

// Protected profile route
app.get("/api/auth/profile", protect, (req, res) => {
res.status(200).json({
message: "Protected route accessed successfully",
user: req.user
});
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
try {
await connectDB();


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
}

};

startServer();
