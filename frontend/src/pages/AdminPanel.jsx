import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import FAQForm from "../components/FAQForm";
import FAQList from "../components/FAQList";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function AdminPanel() {
    const [faqs, setFaqs] = useState([]);
    const [editingFAQ, setEditingFAQ] = useState(null);

    // Add language state for admin view
    const [lang, setLang] = useState("en");

    const fetchFAQs = async () => {
        try {
            const { data } = await api.get("/faqs");
            setFaqs(data);
        } catch (err) {
            console.error("Error fetching FAQs:", err);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, []); // Add fetchFAQs to dependency array if using eslint warnings

    const handleDelete = async (id) => {
        try {
            await api.delete(`/faqs/${id}`);
            setFaqs(faqs.filter((faq) => faq._id !== id));
        } catch (err) {
            console.error("Error deleting FAQ:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Add language switcher to admin panel */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Panel
                    </h1>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher lang={lang} setLang={setLang} />
                        <Link
                            to="/admin/new"
                            className="bg-blue-600 text-[#fff] px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Create New FAQ
                        </Link>
                    </div>
                </div>

                <FAQList
                    faqs={faqs}
                    lang={lang} // Pass language prop
                    onEdit={setEditingFAQ}
                    onDelete={handleDelete}
                />

                {editingFAQ && (
                    <FAQForm
                        existingFAQ={editingFAQ}
                        onSuccess={() => {
                            setEditingFAQ(null);
                            fetchFAQs();
                        }}
                    />
                )}
            </div>
        </div>
    );
}
