import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase/firebase';
import 'react-toastify/dist/ReactToastify.css';

const UpdateQuestion = async (values, setIsLoading, editID, value) => {
  try {
    setIsLoading(true);
    const nowDate = new Date();
    // const docID = Date.now().toString();

    // update the selected document
    const questionRef = doc(db, 'TriviaQuestions', editID);
    await updateDoc(questionRef, {
      question: values?.question.trim(),
      optionA: values?.optionA.trim(),
      optionB: values?.optionB.trim(),
      optionC: values?.optionC.trim(),
      rightAnswer: values?.rightAnswer.trim(),
      visible: value,
      updateAt: nowDate,
    });
    // toast.success("Added to Database Successfully");
  } catch (error) {
    toast.error('Something went wrong 🤒');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default UpdateQuestion;
