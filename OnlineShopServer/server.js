require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const AppError = require("./utils/AppError");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

console.log(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
 app.use(morgan('dev'));
} else {
 app.use(morgan('combined'));
}

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5500",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "OnlineShop API is running",
        data: null
    });
});

app.use((req, res, next) => {
    next(new AppError(`Маршрут ${req.originalUrl} не знайдено`, 404));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Внутрішня помилка сервера";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
        process.exit(1);
    });