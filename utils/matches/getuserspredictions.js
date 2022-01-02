import { db } from "../firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const GetUsersPredictions = async (Id, pred, email, setUsersPredictions) => {
  // pred.forEach(async (match) => {
  const predictedMatchRef = collection(db, email, Id, pred);
  const q = query(predictedMatchRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);

  const newArr = [];
  querySnapshot.forEach((doc) => newArr.push(doc.data()));
  if (newArr.length !== 0) {
    setUsersPredictions(newArr);
  }
  // });
};

export default GetUsersPredictions;
