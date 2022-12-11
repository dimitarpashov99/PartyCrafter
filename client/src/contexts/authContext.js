import * as React from "react";
import { useContext, useMemo } from "react";
const AuthContext = React.createContext({
    authenticated: false,
    setAuthenticated: (auth) => {},
});

export default AuthContext;

export function AuthProvider({ children }) {
    const [auth, setAuth] = React.useState(false);

    // const isAuthenticated = useMemo(
    //     () => ({
    //         auth,
    //     }),
    //     [auth]
    // );
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthConsumer() {
    return useContext(AuthContext);
}
