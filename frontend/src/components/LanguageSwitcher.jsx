// src/components/LanguageSwitcher.jsx
import PropTypes from "prop-types";

export default function LanguageSwitcher({ lang, setLang }) {
    const languages = [
        { code: "en", name: "English" },
        { code: "hi", name: "हिंदी" },
        { code: "bn", name: "বাংলা" },
    ];

    return (
        <div className="flex space-x-2">
            {languages.map((language) => (
                <button
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                        lang === language.code
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {language.name}
                </button>
            ))}
        </div>
    );
}

LanguageSwitcher.propTypes = {
    lang: PropTypes.string.isRequired,
    setLang: PropTypes.func.isRequired,
};
