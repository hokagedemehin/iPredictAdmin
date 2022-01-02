import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
const GetAllMatches = async (setMatches) => {
  const matchRef = collection(db, "PredictedMatches");
  const q = query(matchRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);

  const newArr = [];
  querySnapshot.forEach((doc) => newArr.push(doc.data()));
  if (newArr.length !== 0) {
    setMatches(newArr);
  }
};

export default GetAllMatches;
