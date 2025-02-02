export default function FAQList({ faqs, lang = "en", onEdit, onDelete }) {
    return (
        <div className="space-y-6 mb-8">
            {faqs.map((faq) => (
                <div
                    key={faq._id}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {faq.question[lang]}
                            </h3>
                            <div
                                className="prose max-w-none text-gray-600 mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: faq.answer[lang],
                                }}
                            />
                        </div>
                        {(onEdit || onDelete) && (
                            <div className="flex gap-2">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(faq)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(faq._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
