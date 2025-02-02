import api from "./api";

export const login = async (email, password) => {
    const { data } = await api.post("/auth/signin", { email, password });
    return data;
};

export const register = async (email, password, role) => {
    const { data } = await api.post("/auth/signup", { email, password, role });
    return data;
};
