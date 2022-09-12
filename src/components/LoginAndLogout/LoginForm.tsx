import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_FORM, REGISTER_FORM } from "../../constants/constants";
import {
    HOME,
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
} from "../../constants/routeConstants";
import FirebaseAuthService from "../../firebase/FirebaseAuthService";

interface Props {
    formType: string;
}

const LoginForm = ({ formType }: Props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            await FirebaseAuthService.loginUser(email, password);
            setEmail("");
            setPassword("");

            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleRegister = async () => {
        if (!email || !password) return;
        try {
            await FirebaseAuthService.registerUser(email, password);
            setEmail("");
            setPassword("");

            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            await FirebaseAuthService.loginWithGoogle();

            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleForm =
        formType === REGISTER_FORM ? handleRegister : handleSubmit;

    return (
        <div>
            <h1 className="text-center mt-4">{formType} to continue</h1>
            <hr />
            <div className="col-6 mx-auto mt-4">
                <form onSubmit={handleForm}>
                    <div className="form-group my-2">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control text-center"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control text-center"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    {formType === LOGIN_FORM && (
                        <div className="form-group my-2 d-flex justify-content-end">
                            <Link to={RESET_PASSWORD}>Forget Password?</Link>
                        </div>
                    )}
                    <div className="form-group my-4 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary col-6">
                            {formType}
                        </button>
                    </div>
                </form>
                <hr />
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-outline-light text-dark my-2 mx-1"
                        onClick={handleLoginWithGoogle}
                    >
                        <img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"
                            alt="Google"
                            className="img-fluid"
                        />
                        <span className="px-2">Continue with Google</span>
                    </button>
                    {formType === REGISTER_FORM ? (
                        <p>
                            Already have an account?{" "}
                            <Link to={LOGIN}>Login</Link>
                        </p>
                    ) : (
                        <p>
                            New User? <Link to={REGISTER}>Register</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
