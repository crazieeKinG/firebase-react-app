import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../contextApi/AuthProvider";
import { AuthUser } from "../../domain/AuthContext";
import FirebaseFirestoreService from "../../firebase/FirebaseFirestoreService";
import ResetPassword from "../../components/LoginAndLogout/ResetPassword";
import LoginForm from "../../components/LoginAndLogout/LoginForm";
import Logout from "../../components/LoginAndLogout/Logout";
import AddEditBlogForm from "../../components/Blog/AddEditBlogForm";
import IBlog from "../../domain/IBlog";
import BlogCard from "../../components/Blog/BlogCard";

function Home() {
    const { user } = useContext(AuthContext) as AuthUser;
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [currentBlog, setCurrentBlog] = useState<IBlog | null>();

    const handleAddNewBlog = async (newBlog: IBlog) => {
        try {
            const response = await FirebaseFirestoreService.createDocument(
                newBlog
            );

            handeFetchBlogs();
            alert(`Created new blog with id: ${response.id}`);
        } catch (error: any) {
            alert(`Create Document: ${error.messsage}`);
        }
    };

    const handeFetchBlogs = async () => {
        const queries = [];

        if (!user) {
            queries.push({
                field: "isPublished",
                condition: "==",
                value: true,
            });
        }

        let allBlogs: IBlog[] = [];
        try {
            const response = await FirebaseFirestoreService.readDocuments(
                queries
            );

            const fetchedBlogs = response.docs.map((blogDoc) => {
                const id = blogDoc.id;
                const data = blogDoc.data();

                const timestampSeconds = data.publishedDate?.seconds * 1000;
                data.publishedDate = timestampSeconds
                    ? new Date(timestampSeconds)
                    : "Unknown";

                return { ...data, id: id } as IBlog;
            });

            allBlogs = [...fetchedBlogs];
        } catch (error: any) {
            alert(error.message);
        }

        setBlogs(allBlogs);
    };

    const handleUpdateBlog = async (id: string, updatedBlog: IBlog) => {
        try {
            await FirebaseFirestoreService.updateDocument(id, updatedBlog);

            handeFetchBlogs();

            alert(`Succefully updated ${id}`);
            setCurrentBlog(null);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDeleteBlog = async (id: string) => {
        try {
            await FirebaseFirestoreService.deleteDocument(id);

            handeFetchBlogs();
            alert(`Deleted document ${id}`);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleEditBlog = (blogId: string) => {
        const selectedBlog = blogs.find((blog) => blog.id === blogId);

        setCurrentBlog(selectedBlog);
    };

    useEffect(() => {
        // handeFetchBlogs();
    }, [user]);

    return (
        <div className="container">
            <h1>Firebase react app</h1>
            <hr />
            {!user && (
                <>
                    <LoginForm />
                    <div>
                        <h4>Reset Password!</h4>
                        <hr />
                        <ResetPassword />
                    </div>
                </>
            )}
            {user && (
                <div>
                    <Logout existingUser={user.email} />
                    <div className="col-6 mt-3">
                        <h2>Add new blog</h2>
                        <hr />
                        <AddEditBlogForm handleForm={handleAddNewBlog} />
                    </div>
                </div>
            )}
            <div className="mt-3">
                <div className="row">
                    <h3 className="col-8">Blogs</h3>
                    <div className="col-4 d-flex justify-content-end">
                        <button
                            className="btn btn-info text-light"
                            onClick={handeFetchBlogs}
                        >
                            Refresh
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="row col-8">
                        {blogs.map((blog) => (
                            <div
                                className="col-sm-12 col-md-6 col-lg-6 my-2 px-2"
                                key={blog.id}
                            >
                                <BlogCard
                                    blog={blog}
                                    handleEditBlog={handleEditBlog}
                                />
                            </div>
                        ))}
                    </div>
                    {user && (
                        <div className="col-4">
                            <h2>Edit blog</h2>
                            <hr />
                            <AddEditBlogForm
                                initialData={currentBlog as IBlog}
                                handleForm={handleUpdateBlog}
                                handleDeleteBlog={handleDeleteBlog}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
