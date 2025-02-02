import FAQ from "../models/FAQ.js";
import redisClient from "../config/redis.js";
import { translateText } from "../services/translate.js";

// Cache invalidation helper
const clearFAQCache = async () => {
    try {
        const keys = await redisClient.keys("faqs:*");
        if (keys.length) await redisClient.del(keys);
    } catch (err) {
        console.error("Cache clear error:", err);
    }
};

// Get FAQs with caching
export const getFAQs = async (req, res) => {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs:${lang}`;

    try {
        // Cache check
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) return res.json(JSON.parse(cachedData));

        // Database query (lean bcz we don't need to modify the data)
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
export const createFAQ = async (req, res) => {
    const { question_en, answer_en } = req.body;

    try {
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

        // Clear all cached FAQs (We're clearing all cache when we creates new FAQs)
        await clearFAQCache();

        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(400).json({ error: "Invalid FAQ data" });
    }
};

export const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const flattenObject = (obj, prefix = "") => {
            return Object.keys(obj).reduce((acc, key) => {
                const prefixedKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    Object.assign(acc, flattenObject(obj[key], prefixedKey));
                } else {
                    acc[prefixedKey] = obj[key];
                }
                return acc;
            }, {});
        };

        const faq = await FAQ.findByIdAndUpdate(
            id,
            { $set: flattenObject(updateData) },
            { new: true, runValidators: true }
        );

        if (!faq) return res.status(404).json({ error: "FAQ not found" });

        await clearFAQCache();
        res.json(faq);
    } catch (error) {
        res.status(400).json({ error: "Invalid update data" });
    }
};

export const deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) return res.status(404).json({ error: "FAQ not found" });

        await clearFAQCache();
        res.status(204).json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
