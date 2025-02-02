// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PublicFAQs from "./pages/PublicFAQs";
import FAQFormPage from "./pages/FAQFormPage";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<PublicFAQs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin" element={<AdminPanel />} />

                            <Route
                                path="/admin/new"
                                element={<FAQFormPage />}
                            />

                            <Route
                                path="/admin/edit/:id"
                                element={<FAQFormPage />}
                            />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}
