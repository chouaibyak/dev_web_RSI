'use client'

import { createContext, useContext, useState } from "react"

// crées une boîte globale
const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    // login({ name: "Chouaib" })
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {/* exemple:
            <AuthProvider>
            <App />
            </AuthProvider> */}
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);