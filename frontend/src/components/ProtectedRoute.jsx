// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, role = "user" }) => {
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Optional: Add analytics tracking for protected route attempts
        if (!user) {
            console.log("Unauthorized access attempt to protected route");
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string,
};

export default ProtectedRoute;
