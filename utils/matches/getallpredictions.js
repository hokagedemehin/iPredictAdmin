import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GetAllPredictions = async (setPredictions, Id) => {
  const matchRef = doc(db, "PredictedMatches", Id);
  // const q = query(matchRef, orderBy("createdAt", "asc"));
  const docSnapshot = await getDoc(matchRef);

  // const newArr = [];
  setPredictions(docSnapshot.data());
  // if (newArr.length !== 0) {
  //   (newArr);
  // }
};

export default GetAllPredictions;
