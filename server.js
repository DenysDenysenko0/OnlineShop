require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const AppError = require("./utils/AppError");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());
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

        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });