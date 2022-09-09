import { useNavigate } from "react-router-dom";
import AddEditBlogForm from "../../components/Blog/AddEditBlogForm";
import { HOME } from "../../constants/routeConstants";
import IBlog from "../../domain/IBlog";
import FirebaseFirestoreService from "../../firebase/FirebaseFirestoreService";

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

    return (
        <div>
            <AddEditBlogForm handleForm={handleAddNewBlog} />
        </div>
    );
};

export default NewBlog;
