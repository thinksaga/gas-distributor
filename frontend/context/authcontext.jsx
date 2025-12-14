import {createContext, useState, useEffect} from 'react';

const authcontext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    // Flag that indicates we've finished checking local storage for an existing session
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Check for existing login state on app startup
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setIsLoggedIn(true);
                setUserRole(userData.data.role || "user");
            } catch (error) {
                // If parsing fails, clear invalid data
                localStorage.removeItem("user");
            }
        }
        // Mark that initial auth check is finished (prevents redirect loops)
        setIsAuthChecked(true);
    }, []);

    const logout = (callback) => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserRole("");
        setShowLogin(false);
        setShowSignup(false);
        if (callback) callback();
    };

    return (
        <authcontext.Provider value={{
            isLoggedIn,
            userRole,
            setIsLoggedIn,
            setUserRole,
            isAuthChecked,
            showLogin,
            setShowLogin,
            showSignup,
            setShowSignup,
            logout
        }}>
            {children}
        </authcontext.Provider>
    );
}

export {authcontext, AuthProvider};