import { db } from '../firebase/firebase';

import {
  collection,
  // addDoc,
  setDoc,
  getDocs,
  doc,
  // updateDoc,
  // serverTimestamp,
  query,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitQuestions = async (values, setIsLoading, value) => {
  try {
    setIsLoading(true);
    const nowDate = new Date();
    const docID = Date.now().toString();

    // check if the question already exist in the collection
    let ques = null;
    const triviaRef = collection(db, 'TriviaQuestions');
    const q = query(
      triviaRef,
      where('question', '==', values?.question.trim())
    );
    const triviaSnapshot = await getDocs(q);
    triviaSnapshot.forEach((oneDoc) => {
      toast.info('This question already exists');
      console.log(oneDoc.data());
      ques = oneDoc.data();
      return;
    });

    // create the new document
    if (!ques) {
      const questionRef = doc(db, 'TriviaQuestions', docID);
      await setDoc(questionRef, {
        question: values?.question.trim(),
        optionA: values?.optionA.trim(),
        optionB: values?.optionB.trim(),
        optionC: values?.optionC.trim(),
        rightAnswer: values?.rightAnswer.trim(),
        ID: docID,
        createdAt: nowDate,
        updateAt: null,
        userIDs: [],
        visible: value,
      });
      toast.success('Added to Database Successfully');
    }
  } catch (error) {
    toast.error('Something went wrong 🤒');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default SubmitQuestions;
