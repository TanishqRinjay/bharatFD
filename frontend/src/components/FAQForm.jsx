import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../services/api";

export default function FAQForm({ existingFAQ, onSuccess }) {
    const [formData, setFormData] = useState({
        question_en: existingFAQ?.question.en || "",
        answer_en: existingFAQ?.answer.en || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingFAQ) {
                await api.patch(`/faqs/${existingFAQ._id}`, {
                    question: { en: formData.question_en },
                    answer: { en: formData.answer_en },
                });
            } else {
                await api.post("/faqs", formData);
            }
            onSuccess();
        } catch (err) {
            console.error("Error saving FAQ:", err);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question (English)
                    </label>
                    <input
                        type="text"
                        value={formData.question_en}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                question_en: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer (English)
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={formData.answer_en}
                        onChange={(value) =>
                            setFormData({ ...formData, answer_en: value })
                        }
                        className="bg-white rounded-md"
                        modules={{
                            toolbar: [
                                ["bold", "italic", "underline"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "clean"],
                            ],
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    {existingFAQ ? "Update FAQ" : "Create FAQ"}
                </button>
            </form>
        </div>
    );
}
