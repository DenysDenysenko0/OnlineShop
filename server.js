require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const authRoutes = require("./routes/authRoutes");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "OnlineShop API is running",
        data: null
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