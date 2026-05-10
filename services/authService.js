const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.registerUser = async ({ name, email, password, confirmPassword }) => {
    if (!name || !email || !password || !confirmPassword) {
        throw new AppError("All fields are required", 400);
    }

    if (password !== confirmPassword) {
        throw new AppError("Confirmation password is not the same as entered password", 400);
    }

    if (password.length < 8) {
        throw new AppError("Password must be at least 8 characters long", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return user;
};

exports.loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new AppError("Введіть email та пароль", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Невірний email або пароль", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Невірний email або пароль", 401);
    }

    return user;
};