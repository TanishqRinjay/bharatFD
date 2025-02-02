import FAQ from "../models/FAQ.js";
import redisClient from "../config/redis.js";
import { translateText } from "../services/translate.js";

// Cache invalidation helper
const clearFAQCache = async () => {
    const keys = await redisClient.keys("faqs:*");
    if (keys.length > 0) await redisClient.del(keys);
};

// Get FAQs with caching
export const getFAQs = async (req, res) => {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs:${lang}`;

    try {
        // Cache check
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) return res.json(JSON.parse(cachedData));

        // Database query
        const faqs = await FAQ.find().lean();

        // Process translations
        const processedFAQs = faqs.map((faq) => ({
            question: faq.question[lang] || faq.question.en,
            answer: faq.answer[lang] || faq.answer.en,
        }));

        // Set cache with 1-hour expiration
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(processedFAQs));

        res.json(processedFAQs);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create FAQ with auto-translation
export const createFAQ = async (req, res) => {
    const { question_en, answer_en } = req.body;

    try {
        // Parallel translations
        const [question_hi, question_bn, answer_hi, answer_bn] =
            await Promise.all([
                translateText(question_en, "hi"),
                translateText(question_en, "bn"),
                translateText(answer_en, "hi"),
                translateText(answer_en, "bn"),
            ]);

        // Create new FAQ
        const newFAQ = await FAQ.create({
            question: {
                en: question_en,
                hi: question_hi,
                bn: question_bn,
            },
            answer: {
                en: answer_en,
                hi: answer_hi,
                bn: answer_bn,
            },
        });

        // Clear all cached FAQs
        await clearFAQCache();

        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(400).json({ error: "Invalid FAQ data" });
    }
};
