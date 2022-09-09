import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "../components/LoginAndLogout/Logout";
import Navbar from "../components/Navbar/Navbar";
import {
    ADD_BLOG,
    EDIT_BLOG,
    HOME,
    LOGIN,
    LOGOUT,
    NOT_FOUND,
    REGISTER,
} from "../constants/routeConstants";
import { AppContext } from "../contextApi/AuthProvider";
import { IContext } from "../domain/IContext";
import EditBlog from "../pages/Blog/EditBlog";
import NewBlog from "../pages/Blog/NewBlog";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const AppRoutes = () => {
    const { user } = useContext(AppContext) as IContext;

    return (
        <BrowserRouter>
            <Routes>
                <Route path={HOME} element={<AuthenticatedRoutes />}>
                    <Route path={ADD_BLOG} element={<NewBlog />} />
                    <Route path={EDIT_BLOG} element={<EditBlog />} />
                    <Route
                        path={LOGOUT}
                        element={<Logout existingUser={user?.email} />}
                    />
                </Route>
                <Route path={HOME} element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path={LOGIN} element={<Login />} />
                    <Route path={REGISTER} element={<Register />} />
                </Route>
                <Route
                    path={NOT_FOUND}
                    element={<h2 className="container">Page not found</h2>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
