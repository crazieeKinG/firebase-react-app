import firebase from "./FirebaseConfig";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    QueryConstraint,
    updateDoc,
    where,
} from "firebase/firestore";
import IBlog from "../domain/IBlog";
import { BLOG_COLLECTION_NAME } from "../constants/constants";

const firestore = getFirestore(firebase);
const selectedCollection = collection(firestore, BLOG_COLLECTION_NAME);

const createDocument = (document: IBlog) => {
    return addDoc(selectedCollection, document);
};

const readDocuments = (queries: any[]) => {
    const allQueries: QueryConstraint[] = [];
    queries.forEach((query) => {
        allQueries.push(where(query.field, query.condition, query.value));
    });
    const latestBlogOrder = orderBy("publishedDate", "desc");
    return getDocs(query(selectedCollection, ...allQueries, latestBlogOrder));
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
