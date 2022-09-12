import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginAndLogout/LoginForm";
import { REGISTER_FORM } from "../../constants/constants";
import { HOME } from "../../constants/routeConstants";
import { AppContext } from "../../contextApi/AuthProvider";
import { IContext } from "../../domain/IContext";
import { setPageTitle } from "../../utils/setPageTitle";

const Register = () => {
    const { user } = useContext(AppContext) as IContext;

    useEffect(() => {
        setPageTitle("Simple Blog | Login");
    }, []);

    return user ? (
        <Navigate to={HOME} />
    ) : (
        <LoginForm formType={REGISTER_FORM} />
    );
};

export default Register;
