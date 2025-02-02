import { useState, useEffect } from "react";
import api from "../services/api";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FAQList from "../components/FAQList";

export default function PublicFAQs() {
    const [faqs, setFaqs] = useState([]);
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const { data } = await api.get(`/faqs?lang=${lang}`);
                setFaqs(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFAQs();
    }, [lang]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">FAQs</h1>
                <LanguageSwitcher lang={lang} setLang={setLang} />
            </div>

            <FAQList faqs={faqs} lang={lang} />
        </div>
    );
}
