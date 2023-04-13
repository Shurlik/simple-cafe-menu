import { child, get, getDatabase, ref, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
    setAnnouncement,
    setMenuItems,
    setLoading,
} from "../store/slices/menu";
import { v4 } from "uuid";
import { removeToken } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ROOT = "cafe/v2";

export function useFirebase() {
    const dbRef = ref(getDatabase());
    const storage = getStorage();
    const db = getDatabase();
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const logout = () => {
        dispatch(removeToken());
        navigate("/login");
    };

    const getFbData = async (key) => {
        dispatch(setLoading(true));
        const dataLink = key ? `${ROOT}/${key}` : `${ROOT}`;
        try {
            const snap = await get(child(dbRef, dataLink));
            if (snap.exists()) {
                const data = snap.val();
                let loadedItems = [];
                for (const key in data.items) {
                    loadedItems.push(data.items[key]);
                }
                dispatch(setMenuItems(loadedItems));
                dispatch(setAnnouncement(data.announcement));
                dispatch(setLoading(false));
                return true;
            } else {
                dispatch(setLoading(false));
                return false;
            }
        } catch (e) {
            alert(t("badLoad"));
            dispatch(setLoading(false));
            return false;
        }
    };

    const updateFbAnnouncement = async (data) => {
        try {
            await update(ref(db, `${ROOT}/`), { announcement: data });
            await getFbData();
            console.log("Announcement update success");
        } catch (e) {
            console.log("Announcement update error: ");
            logout();
            return false;
        }
    };

    const fbAuth = async ({ email, password }) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            if (
                e.message.indexOf("auth/wrong-password") !== -1 ||
                e.message.indexOf("auth/invalid-email") !== -1 ||
                e.message.indexOf("auth/user-not-found") !== -1
            ) {
                return "authError";
            } else {
                return "unknown";
            }
        }
    };

    const updateItem = async ({ index, data }) => {
        try {
            await update(ref(db, `${ROOT}/items/${index}`), data);
            await getFbData();
            console.log("Item update success");
        } catch (e) {
            console.log("Item update error ");
            logout();
            return false;
        }
    };

    const fbFileUpload = async (image) => {
        if (!image) {
            return;
        }
        const imageRef = storageRef(storage, `${v4() + "-" + image.name}`); // getting image ref
        try {
            const uploadTask = await uploadBytes(imageRef, image); // uploading
            return getDownloadURL(uploadTask.ref); //getting url fo file
        } catch (e) {
            console.log("Upload error ");
            logout();
            return false;
        }
    };

    return {
        getFbData,
        fbAuth,
        updateFbAnnouncement,
        updateItem,
        fbFileUpload,
    };
}
