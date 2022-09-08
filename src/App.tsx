import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contextApi/AuthProvider";
import Home from "./pages/Home/Home";

function App() {
    return (
        <AuthProvider>
            <Home />
        </AuthProvider>
    );
}

export default App;
