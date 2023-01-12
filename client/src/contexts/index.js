import React, { useContext } from "react";

/**
 * Authentication context for application
 */
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({
        authenticated: false,
        profile: null,
        invitations: [],
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = () => {
    return useContext(AuthContext);
};

export { AuthProvider, AuthConsumer, AuthContext };

/**
 * Color mode context for switching light/dark mode pallete for UI
 */

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export { ColorModeContext };
