import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GetUsersInfo = async (email, setUserInfo) => {
  const userRef = collection(db, "users");

  const q = query(userRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setUserInfo(doc.data());
  });
};

export default GetUsersInfo;
