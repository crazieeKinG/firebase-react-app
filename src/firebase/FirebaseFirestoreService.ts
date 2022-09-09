import firebase from "./FirebaseConfig";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    updateDoc,
    where,
} from "firebase/firestore";
import IBlog from "../domain/IBlog";
import {
    BLOG_COLLECTION_NAME,
    DEFAULT_BLOG_PER_PAGE,
} from "../constants/constants";

const firestore = getFirestore(firebase);
const selectedCollection = collection(firestore, BLOG_COLLECTION_NAME);

const createDocument = (document: IBlog) => {
    return addDoc(selectedCollection, document);
};

const readDocument = (documentId: string) => {
    return getDoc(doc(selectedCollection, documentId));
};

const readDocuments = async (queries: any[], lastDocumnetId: string = "") => {
    const allQueries: QueryConstraint[] = [];
    queries.forEach((query) => {
        allQueries.push(where(query.field, query.condition, query.value));
    });
    const latestBlogOrder = orderBy("publishedDate", "desc");

    let cursorId: QueryConstraint = startAfter("");
    if (lastDocumnetId) {
        const lastDoc = await readDocument(lastDocumnetId);
        cursorId = startAfter(lastDoc);
    }
    const limitConstraint = limit(DEFAULT_BLOG_PER_PAGE);
    return getDocs(
        query(
            selectedCollection,
            ...allQueries,
            latestBlogOrder,
            cursorId,
            limitConstraint
        )
    );
};

const updateDocument = (id: string, document: any) => {
    const selectDocument = doc(selectedCollection, id);

    return updateDoc(selectDocument, document);
};

const deleteDocument = (id: string) => {
    const selectDocument = doc(selectedCollection, id);

    return deleteDoc(selectDocument);
};

const FirebaseFirestoreService = {
    createDocument,
    readDocuments,
    updateDocument,
    deleteDocument,
};

export default FirebaseFirestoreService;
