import { useState } from "react";
import FirebaseAuthService from "../../firebase/FirebaseAuthService";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            await FirebaseAuthService.registerUser(email, password);
            setEmail("");
            setPassword("");
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            await FirebaseAuthService.loginWithGoogle();
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="col-6">
            <div className="form-group my-2">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <div className="form-group my-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
            </div>
            <button type="submit" className="btn btn-primary my-2">
                Login
            </button>
            <button
                type="button"
                className="btn btn-primary my-2 mx-1"
                onClick={handleLoginWithGoogle}
            >
                Login with Google
            </button>
        </form>
    );
};

export default LoginForm;
