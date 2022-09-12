import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddEditBlogForm from "../../components/Blog/AddEditBlogForm";
import { HOME } from "../../constants/routeConstants";
import IBlog from "../../domain/IBlog";
import FirebaseFirestoreService from "../../firebase/FirebaseFirestoreService";
import { setPageTitle } from "../../utils/setPageTitle";

const NewBlog = () => {
    const navigate = useNavigate();
    const handleAddNewBlog = async (newBlog: IBlog) => {
        try {
            const response = await FirebaseFirestoreService.createDocument(
                newBlog
            );

            alert(`Created new blog with id: ${response.id}`);
            navigate(HOME);
        } catch (error: any) {
            alert(`Create Document: ${error.messsage}`);
        }
    };

    useEffect(() => {
        setPageTitle("Simple Blog | Add new blog");
    }, []);

    return (
        <div className="mt-3">
            <h1>New Blog</h1>
            <hr />
            <AddEditBlogForm handleForm={handleAddNewBlog} />
        </div>
    );
};

export default NewBlog;
