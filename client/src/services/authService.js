import { apiCall, urlencodeFormData } from "./utils";

const register = async (formData) => {
    return await apiCall
        .post("signup", urlencodeFormData(formData))
        .then((response) => {
            return response.data;
        });
};

const login = async (email, password) => {
    return await apiCall.post("signin", {
        email,
        password,
    });
};

const logout = async () => {
    localStorage.removeItem("user");
    return await apiCall.post("signout").then((response) => {
        return response.data;
    });
};

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;
