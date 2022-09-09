import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEditBlogForm from "../../components/Blog/AddEditBlogForm";
import { HOME } from "../../constants/routeConstants";
import { AppContext } from "../../contextApi/AuthProvider";
import IBlog from "../../domain/IBlog";
import { IContext } from "../../domain/IContext";
import FirebaseFirestoreService from "../../firebase/FirebaseFirestoreService";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blogs } = (useContext(AppContext) as IContext).blog;
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
    const handleUpdateBlog = async (id: string, updatedBlog: IBlog) => {
        try {
            await FirebaseFirestoreService.updateDocument(id, updatedBlog);

            alert(`Succefully updated ${id}`);
            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDeleteBlog = async (id: string) => {
        try {
            await FirebaseFirestoreService.deleteDocument(id);

            alert(`Deleted document ${id}`);
            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        const blog = blogs?.find((blog) => blog.id === id);
        setSelectedBlog(blog as IBlog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <AddEditBlogForm
                initialData={selectedBlog as IBlog}
                handleForm={handleUpdateBlog}
                handleDeleteBlog={handleDeleteBlog}
            />
        </div>
    );
};

export default EditBlog;
