import { useContext } from "react";
import { AppContext } from "../../contextApi/AuthProvider";
import { IContext } from "../../domain/IContext";
import IBlog from "../../domain/IBlog";
import { Link } from "react-router-dom";
import { EDIT_BLOG } from "../../constants/routeConstants";
import { editRoute } from "../../utils/editRoute";

interface Props {
    blog: IBlog;
}

const BlogCard = ({ blog }: Props) => {
    const { user } = useContext(AppContext) as IContext;

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">
                    {blog.title}{" "}
                    {!blog.isPublished && (
                        <small className="text-danger">(Unpublished)</small>
                    )}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {blog.publishedDate.toDateString()}
                </h6>
            </div>
            <div className="card-body">
                <p className="card-text">{blog.content}</p>
                {blog.imageUrl && (
                    <>
                        <hr />
                        <img
                            className="img-fluid rounded"
                            src={blog.imageUrl}
                            alt={blog.title}
                        />
                    </>
                )}
            </div>
            <div className="card-footer">
                <div className="row justify-content-between">
                    <h6 className="card-subtitle my-2 text-muted col-10">
                        - {blog.author}
                    </h6>
                    {user && user.email === blog.author && (
                        <Link
                            to={editRoute(EDIT_BLOG, blog.id as string)}
                            className="btn btn-primary col-2"
                        >
                            Edit
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
