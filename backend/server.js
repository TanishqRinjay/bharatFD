import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import faqRoutes from "./routes/faqRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/faqs", faqRoutes);

// Initialize
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
