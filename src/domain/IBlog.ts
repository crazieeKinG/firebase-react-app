interface IBlog {
    id?: string;
    title: string;
    content: string;
    publishedDate: Date;
    isPublished: boolean;
    author: string;
}

export default IBlog;
