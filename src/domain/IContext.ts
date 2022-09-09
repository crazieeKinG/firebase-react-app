import IBlog from "./IBlog";

export interface IContext {
    user: any;
    blog: {
        blogs: IBlog[];
        setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>;
    };
}
