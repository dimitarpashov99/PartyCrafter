import * as React from "react";

const AuthContext = React.createContext({
    authenticated: false,
    setAuthenticated: (auth) => {},
});

export default AuthContext;

export function AuthProvider({ children }) {
    const [auth, setAuth] = React.useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthConsumer() {
    return React.useContext(AuthContext);
}
