import axios from "axios";

export const translateText = async (text, targetLang) => {
    try {
        const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                text
            )}&langpair=en|${targetLang}`
        );
        return response.data.responseData.translatedText || text;
    } catch (error) {
        console.error("Translation failed:", error);
        return text;
    }
};
