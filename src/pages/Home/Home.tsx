import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../contextApi/AuthProvider";
import { IContext } from "../../domain/IContext";
import BlogCard from "../../components/Blog/BlogCard";
import { fetchAllBlogs } from "../../utils/fetchBlogs";
import {
    All_BLOGS,
    DEFAULT_BLOG_PER_PAGE,
    LOAD_MORE_BLOGS,
} from "../../constants/constants";

function Home() {
    const contextApi = useContext(AppContext) as IContext;
    const { user } = contextApi;
    const { blogs, setBlogs } = contextApi.blog;
    const [loadMoreBlog, setloadMoreBlog] = useState<string>(LOAD_MORE_BLOGS);

    const handleFetchBlogs = async () => {
        const allBlogs = await fetchAllBlogs();
        setBlogs(allBlogs);
    };

    const loadBlogs = async () => {
        let lastBlogId: string = "";
        if (blogs.length > 0) {
            const lastBlogIndex = blogs.length - 1;
            lastBlogId = blogs[lastBlogIndex].id as string;
            console.log(lastBlogId, lastBlogIndex, blogs[lastBlogIndex]);
        }

        const newBlogs = await fetchAllBlogs(lastBlogId);
        if (newBlogs.length < DEFAULT_BLOG_PER_PAGE) {
            setloadMoreBlog(All_BLOGS);
        }

        const allBlogs = [...blogs, ...newBlogs];
        setBlogs(allBlogs);
    };

    useEffect(() => {
        handleFetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="container">
            <div className="mt-3">
                <div className="row">
                    <h3 className="col-8">Blogs</h3>
                    <div className="col-4 d-flex justify-content-end">
                        <button
                            className="btn btn-info text-light"
                            onClick={handleFetchBlogs}
                        >
                            Refresh
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row col-sm-12">
                    {blogs?.map((blog) => (
                        <div className="col-sm-12 mb-4 px-auto" key={blog.id}>
                            <BlogCard blog={blog} />
                        </div>
                    ))}

                    {blogs.length > 0 && loadMoreBlog === LOAD_MORE_BLOGS ? (
                        <button
                            className="btn btn-primary col-6 mx-auto my-3"
                            onClick={loadBlogs}
                        >
                            {loadMoreBlog}
                        </button>
                    ) : (
                        <h6 className="text-center my-3">{All_BLOGS}</h6>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
