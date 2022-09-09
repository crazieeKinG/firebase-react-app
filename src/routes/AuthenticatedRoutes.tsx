import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { LOGIN } from "../constants/routeConstants";
import { AppContext } from "../contextApi/AuthProvider";
import { IContext } from "../domain/IContext";

const AuthenticatedRoutes = () => {
    const { user } = useContext(AppContext) as IContext;

    return user ? <Navbar /> : <Navigate to={LOGIN} />;
};

export default AuthenticatedRoutes;
