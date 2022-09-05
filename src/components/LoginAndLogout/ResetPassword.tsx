import { useState } from "react";
import FirebaseAuthService from "../../firebase/FirebaseAuthService";

const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");

    const handleSendResetPasswordEmail = async () => {
        if (!email) {
            alert("Missing email!");
            return;
        }

        try {
            await FirebaseAuthService.sendResetPasswordEmail(email);
            alert("Reset password email sent successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="my-2">
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
            <button
                className="btn btn-primary"
                onClick={handleSendResetPasswordEmail}
            >
                Submit
            </button>
        </div>
    );
};

export default ResetPassword;
