import { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthProvider";
import { AuthUser } from "../../domain/AuthContext";
import IBlog from "../../domain/IBlog";

interface Props {
    blog: IBlog;
    handleEditBlog: (blogId: string) => void;
}

const BlogCard = ({ blog, handleEditBlog }: Props) => {
    const { user } = useContext(AuthContext) as AuthUser;
    return (
        <div className="card col-12">
            <div className="card-body">
                <h5 className="card-title">
                    {blog.title}{" "}
                    {!blog.isPublished && (
                        <small className="text-danger">(Unpublished)</small>
                    )}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {blog.publishedDate.toDateString()}
                </h6>
                <hr />
                <p className="card-text">{blog.content}</p>
                <h6 className="card-subtitle mb-2 text-muted">
                    - {blog.author}
                </h6>
            </div>
            {user && user.email === blog.author && (
                <div className="card-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleEditBlog(blog.id as string)}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
