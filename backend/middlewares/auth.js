import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authorized - No token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Not authorized - Invalid token",
        });
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission",
            });
        }
        next();
    };
};
