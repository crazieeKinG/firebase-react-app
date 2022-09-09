import LoginForm from "../../components/LoginAndLogout/LoginForm";
import { REGISTER_FORM } from "../../constants/constants";

const Register = () => {
    return <LoginForm formType={REGISTER_FORM} />;
};

export default Register;
