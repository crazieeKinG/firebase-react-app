import IBlog from "../../domain/IBlog";

interface Props {
    blog: IBlog;
    handleDelete: (id: string) => Promise<void>;
}

const DeleteConfirm = ({ blog, handleDelete }: Props) => {
    return (
        <>
            <button
                type="button"
                className="btn btn-danger mx-2"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
            >
                Delete
            </button>

            <div
                className="modal fade"
                id="deleteModal"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">
                                Are you sure you want to delete this item?
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Delete blog post: <strong>{blog.title}</strong>{" "}
                            [ref. <i>{blog.id}</i>]
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => handleDelete(blog?.id as string)}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirm;
