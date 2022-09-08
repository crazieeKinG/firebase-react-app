import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextApi/AuthProvider";
import { AuthUser } from "../../domain/AuthContext";
import IBlog from "../../domain/IBlog";

interface Props {
    initialData?: IBlog;
    handleForm: (...args: any[]) => Promise<void>;
    handleDeleteBlog?: (id: string) => Promise<void>;
}

const AddEditBlogForm = ({
    initialData,
    handleForm,
    handleDeleteBlog,
}: Props) => {
    const { user } = useContext(AuthContext) as AuthUser;
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [publishedDate, setPublishedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        if (initialData) {
            setTitle(initialData?.title as string);
            setContent(initialData?.content as string);
            setPublishedDate(
                (initialData?.publishedDate as Date).toISOString().split("T")[0]
            );
        } else resetForm();
    }, [initialData]);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const author = user?.email;

        if (!author) {
            alert("Permission denied");
            return;
        }

        if (!title || !content) {
            alert("Missing content");
            return;
        }
        const isPublished =
            new Date(publishedDate) <= new Date() ? true : false;

        const blog: IBlog = {
            title: title,
            content: content,
            publishedDate: new Date(publishedDate),
            isPublished: isPublished,
            author: author,
        };

        initialData
            ? handleForm(initialData.id, blog).then(() => resetForm())
            : handleForm(blog).then(() => resetForm());
    };

    const handleDelete = (id: string) => {
        (handleDeleteBlog as (id: string) => Promise<void>)(id).then(() =>
            resetForm()
        );
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setPublishedDate(new Date().toISOString().split("T")[0]);
    };

    return (
        <form className="col-12" onSubmit={handleSubmit}>
            <div className="form-group row my-2">
                <label htmlFor="title" className="col-4 col-form-label">
                    Title
                </label>
                <div className="col-8">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>
            </div>
            <div className="form-group row my-2">
                <label htmlFor="content" className="col-4 col-form-label">
                    Content
                </label>
                <div className="col-8">
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="Content"
                        cols={30}
                        rows={5}
                        required
                    ></textarea>
                </div>
            </div>
            <div className="form-group row my-2">
                <label htmlFor="publishedDate" className="col-4 col-form-label">
                    Published Date
                </label>
                <div className="col-8">
                    <input
                        type="date"
                        className="form-control"
                        id="publishedDate"
                        value={publishedDate}
                        onChange={(event) =>
                            setPublishedDate(event.target.value)
                        }
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary my-2">
                Submit
            </button>
            {initialData && (
                <button
                    type="button"
                    className="btn btn-danger my-2 mx-2"
                    onClick={() => handleDelete(initialData?.id as string)}
                >
                    Delete
                </button>
            )}
        </form>
    );
};

export default AddEditBlogForm;
