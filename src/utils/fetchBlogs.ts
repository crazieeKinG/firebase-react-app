import IBlog from "../domain/IBlog";
import FirebaseFirestoreService from "../firebase/FirebaseFirestoreService";

export const fetchAllBlogs = async (lastBlogId: string = "") => {
    const queries = [
        {
            field: "isPublished",
            condition: "==",
            value: true,
        },
    ];

    let allBlogs: IBlog[] = [];
    try {
        const response = await FirebaseFirestoreService.readDocuments(
            queries,
            lastBlogId
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

    return allBlogs;
};
