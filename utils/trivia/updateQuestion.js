// import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
// import { db } from '../firebase/firebase';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdateQuestion = async (values, setIsLoading, editID, value, quesId) => {
  try {
    setIsLoading(true);
    // const nowDate = new Date();
    // const docID = Date.now().toString();

    // update the selected document
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias/${editID}`,
      {
        data: {
          quesId: quesId,
          question: values?.question.trim(),
          answer: values?.rightAnswer.trim(),
          optionA: values?.optionA.trim(),
          optionB: values?.optionB.trim(),
          optionC: values?.optionC.trim(),
          visible: value == 'yes' ? true : false,
        },
      }
    );

    // const questionRef = doc(db, 'TriviaQuestions', editID);
    // await updateDoc(questionRef, {
    //   question: values?.question.trim(),
    //   optionA: values?.optionA.trim(),
    //   optionB: values?.optionB.trim(),
    //   optionC: values?.optionC.trim(),
    //   rightAnswer: values?.rightAnswer.trim(),
    //   visible: value,
    //   updateAt: nowDate,
    // });
    // toast.success("Added to Database Successfully");
  } catch (error) {
    toast.error('Something went wrong 🤒');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default UpdateQuestion;
