import React, { createContext, useState } from "react";
import { AuthUser } from "../domain/AuthContext";
import FirebaseAuthService from "../firebase/FirebaseAuthService";

export const AuthContext = createContext<AuthUser | undefined>(undefined);

interface Props {
    children?: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<any>(null);

    FirebaseAuthService.subscribeToAuthChanges(setUser);

    return (
        <AuthContext.Provider value={{ user: user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
