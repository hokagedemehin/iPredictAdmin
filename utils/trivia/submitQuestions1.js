// import { db } from '../firebase/firebase';
import { nanoid } from 'nanoid';

import // collection,
// // addDoc,
// setDoc,
// getDocs,
// doc,
// updateDoc,
// serverTimestamp,
// query,
// where,
'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const qs = require('qs');

const SubmitQuestions1 = async (values, setIsLoading, value) => {
  try {
    setIsLoading(true);
    // const nowDate = new Date();
    const docID = nanoid();

    // check if the question already exist in the collection
    // let ques = null;
    // const triviaRef = collection(db, 'TriviaQuestions');
    // const q = query(
    //   triviaRef,
    //   where('question', '==', values?.question.trim())
    // );
    // const triviaSnapshot = await getDocs(q);
    // triviaSnapshot.forEach((oneDoc) => {
    //   toast.info('This question already exists');
    //   console.log(oneDoc.data());
    //   ques = oneDoc.data();
    //   return;
    // });

    const query = qs.stringify(
      {
        filters: {
          question: {
            $eq: values?.question.trim(),
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data: oneQues } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias?${query}`
    );

    // console.log('oneQues', oneQues);

    // create the new document
    if (oneQues?.data.length == 0) {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias`, {
        data: {
          quesId: docID,
          question: values?.question.trim(),
          answer: values?.rightAnswer.trim(),
          optionA: values?.optionA.trim(),
          optionB: values?.optionB.trim(),
          optionC: values?.optionC.trim(),
          visible: value == 'yes' ? true : false,
        },
      });
      toast.success('Added to Database Successfully');
    }
    // if (!ques) {
    //   const questionRef = doc(db, 'TriviaQuestions', docID);
    //   await setDoc(questionRef, {
    //     question: values?.question.trim(),
    //     optionA: values?.optionA.trim(),
    //     optionB: values?.optionB.trim(),
    //     optionC: values?.optionC.trim(),
    //     rightAnswer: values?.rightAnswer.trim(),
    //     ID: docID,
    //     createdAt: nowDate,
    //     updateAt: null,
    //     userIDs: [],
    //     visible: value,
    //   });
    //   toast.success('Added to Database Successfully');
    // }
  } catch (error) {
    toast.error('Something went wrong 🤒');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default SubmitQuestions1;
