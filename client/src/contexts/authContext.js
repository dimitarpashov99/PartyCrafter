import * as React from "react";
import { useContext } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = React.useState({
        authenticated: false,
        profileName: null,
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthConsumer() {
    return useContext(AuthContext);
}

export default AuthContext;
