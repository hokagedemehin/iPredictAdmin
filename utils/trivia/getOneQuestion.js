import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GetOneQuestionFromFirebase = async (questionID) => {
  const questionRef = doc(db, "TriviaQuestions", questionID);
  // const q = query(questionRef, orderBy("createdAt", "desc"));
  const questionSnapshot = await getDoc(questionRef);
  // const newArr = [];
  // if (questionSnapshot.exists()) {
  //   setQuestion(questionSnapshot.data());
  // }
  return questionSnapshot.data();
};

export default GetOneQuestionFromFirebase;
