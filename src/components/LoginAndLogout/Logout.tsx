import FirebaseAuthService from "../../firebase/FirebaseAuthService";

interface Props {
    existingUser: string;
}

const Logout = ({ existingUser }: Props) => {
    const handleLogout = () => {
        FirebaseAuthService.logoutUser();
    };

    return (
        <div>
            <h5>Welcome, {existingUser}</h5>
            <button className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
