import { useEffect, useState } from "react";
import FirebaseAuthService from "../../firebase/FirebaseAuthService";
import { setPageTitle } from "../../utils/setPageTitle";

const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");

    const handleSendResetPasswordEmail = async () => {
        if (!email) {
            alert("Missing email!");
            return;
        }

        try {
            await FirebaseAuthService.sendResetPasswordEmail(email);
            alert(
                "Reset password email sent successfully! Check your email for further processing."
            );
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        setPageTitle("Simple Blog | Reset password");
    }, []);

    return (
        <div className="col-8 text-center mx-auto">
            <h1 className="mt-4">Reset Password</h1>
            <hr />
            <div className="my-2">
                <label htmlFor="resetEmail">Email address</label>
                <input
                    type="email"
                    className="form-control my-2 text-center"
                    id="resetEmail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <button
                className="btn btn-primary my-2"
                onClick={handleSendResetPasswordEmail}
            >
                Submit
            </button>
        </div>
    );
};

export default ResetPassword;
