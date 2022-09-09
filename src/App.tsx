import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AppProvider from "./contextApi/AuthProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <div className="container">
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </div>
    );
}

export default App;
