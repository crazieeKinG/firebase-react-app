import React, { createContext, useState } from "react";
import { IContext } from "../domain/IContext";
import IBlog from "../domain/IBlog";
import FirebaseAuthService from "../firebase/FirebaseAuthService";

export const AppContext = createContext<IContext | undefined>(undefined);

interface Props {
    children?: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
    const [user, setUser] = useState<any>(null);
    const [blogs, setBlogs] = useState<IBlog[]>([]);

    const contextValue = {
        user: user,
        blog: {
            blogs: blogs,
            setBlogs: setBlogs,
        },
    };

    FirebaseAuthService.subscribeToAuthChanges(setUser);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
