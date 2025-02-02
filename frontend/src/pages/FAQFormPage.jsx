import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import FAQForm from "../components/FAQForm";

export default function FAQFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [existingFAQ, setExistingFAQ] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchFAQ = async () => {
                try {
                    const { data } = await api.get(`/faqs/${id}`);
                    setExistingFAQ(data);
                } catch (err) {
                    console.error("Error fetching FAQ:", err);
                }
            };
            fetchFAQ();
        }
    }, [id]);

    const handleSuccess = () => {
        navigate("/admin");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <FAQForm existingFAQ={existingFAQ} onSuccess={handleSuccess} />
            </div>
        </div>
    );
}
