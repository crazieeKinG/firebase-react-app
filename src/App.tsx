import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginAndLogout/LoginForm";
import Logout from "./components/LoginAndLogout/Logout";
import FirebaseAuthService from "./firebase/FirebaseAuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import ResetPassword from "./components/LoginAndLogout/ResetPassword";

function App() {
    const [user, setUser] = useState<any>(null);

    FirebaseAuthService.subscribeToAuthChanges(setUser);
    return (
        <div className="container">
            <h1>Firebase react app</h1>
            <hr />
            {!user && <LoginForm />}

            {!user && (
                <div>
                    <h4>Reset Password!</h4>
                    <hr />
                    <ResetPassword />
                </div>
            )}
            {user && <Logout existingUser={user.email} />}
        </div>
    );
}

export default App;
