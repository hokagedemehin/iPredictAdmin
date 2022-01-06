import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GetQuestionsFromFirebase = async (setQuestions) => {
  const questionRef = collection(db, "TriviaQuestions");
  const q = query(questionRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const newArr = [];
  querySnapshot.forEach((doc) => newArr.push(doc.data()));
  if (newArr.length !== 0) {
    setQuestions(newArr);
  }
};

export default GetQuestionsFromFirebase;
