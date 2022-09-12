import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEditBlogForm from "../../components/Blog/AddEditBlogForm";
import { HOME } from "../../constants/routeConstants";
import { AppContext } from "../../contextApi/AuthProvider";
import IBlog from "../../domain/IBlog";
import { IContext } from "../../domain/IContext";
import FirebaseFirestoreService from "../../firebase/FirebaseFirestoreService";
import { setPageTitle } from "../../utils/setPageTitle";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blogs } = (useContext(AppContext) as IContext).blog;
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
    const handleUpdateBlog = async (blogId: string, updatedBlog: IBlog) => {
        try {
            await FirebaseFirestoreService.updateDocument(blogId, updatedBlog);

            alert(`Succefully updated ${blogId}`);
            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDeleteBlog = async (blogId: string) => {
        try {
            await FirebaseFirestoreService.deleteDocument(blogId);

            alert(`Deleted document ${blogId}`);
            navigate(HOME);
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        setPageTitle("Simple Blog | Edit blog");
        const blog = blogs?.find((eachBlog) => eachBlog.id === id);
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
