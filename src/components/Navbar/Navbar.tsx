import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {
    ADD_BLOG,
    HOME,
    LOGIN,
    LOGOUT,
    REGISTER,
} from "../../constants/routeConstants";
import { AppContext } from "../../contextApi/AuthProvider";
import { IContext } from "../../domain/IContext";

const Navbar = () => {
    const { user } = useContext(AppContext) as IContext;

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid justify-content-between">
                    <Link to={HOME} className="navbar-brand">
                        Simple Blog | Firebase-React-App
                    </Link>

                    <div className="col-8 navbar-nav justify-content-end">
                        <Link to={HOME} className="nav-link active">
                            Home
                        </Link>
                        {!user ? (
                            <>
                                <Link to={REGISTER} className="nav-link">
                                    Register
                                </Link>
                                <Link
                                    to={LOGIN}
                                    className="nav-link btn btn-info text-light px-3"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-info text-light dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user.email}
                                    </button>

                                    <div className="dropdown-menu dropdown-menu-end mt-2">
                                        <Link
                                            to={ADD_BLOG}
                                            className="dropdown-item"
                                        >
                                            Add new blog
                                        </Link>
                                        <Link
                                            to={LOGOUT}
                                            className="dropdown-item"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Navbar;
