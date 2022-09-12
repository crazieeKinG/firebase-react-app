import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import firebase from "./Firebase";

const storage = getStorage(firebase);

const uploadFile = (
    file: File,
    fullPath: string,
    progressCallback: (progress: number) => void
) => {
    const storageRef = ref(storage, fullPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            progressCallback(progress);
        },
        (error) => {
            console.log(error);
            throw error;
        }
    );

    return uploadTask.then(() => {
        return getDownloadURL(uploadTask.snapshot.ref);
    });
};

const deleteFile = (fileDownloadUrl: string) => {
    const decodedUrl = decodeURIComponent(fileDownloadUrl);

    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?");

    const filePath = decodedUrl.substring(startIndex, endIndex);

    const fileReference = ref(storage, filePath);
    return deleteObject(fileReference);
};

const FirebaseStorageService = {
    uploadFile,
    deleteFile,
};

export default FirebaseStorageService;
