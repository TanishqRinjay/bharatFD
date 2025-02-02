import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const getMe = async (req, res) => {
    try {
        // Assuming you're using JWT middleware that sets req.user
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const newUser = await User.create({
            email,
            password,
            role: role || "user",
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token,
            user: {
                id: newUser._id,
                role: newUser.role,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "Invalid user data",
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 2. Generate token
        const token = signToken(user._id);

        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user._id,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "Invalid request",
        });
    }
};
