import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HOME } from "../../constants/routeConstants";
import { setPageTitle } from "../../utils/setPageTitle";

const NotFound = () => {
    useEffect(() => {
        setPageTitle("404 - Page not found");
    }, []);

    return (
        <div className="mt-4 text-center">
            <h1 className="my-4">404</h1>
            <h2 className="my-4">PAGE NOT FOUND</h2>

            <hr />

            <h4>
                Go to <Link to={HOME} >HOME</Link>!
            </h4>
        </div>
    );
};

export default NotFound;
