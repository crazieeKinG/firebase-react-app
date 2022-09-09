import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routeConstants";
import FirebaseAuthService from "../../firebase/FirebaseAuthService";

interface Props {
    existingUser: string;
}

const Logout = ({ existingUser }: Props) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        FirebaseAuthService.logoutUser().then(() => {
            navigate(HOME);
        });
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <h5>Logging out, {existingUser}</h5>
        </div>
    );
};

export default Logout;
