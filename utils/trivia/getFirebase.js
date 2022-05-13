// import React from 'react'
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { nanoid } from 'nanoid';
const getFirebase = async () => {
  let arr = [];
  const queryRef = collection(db, 'TriviaQuestions');
  const querySnapshot = await getDocs(queryRef);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
    // console.log(doc.data());
  });
  if (arr.length !== 0) {
    arr.forEach(async (elem) => {
      const id = nanoid();
      // console.log(id);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias`, {
        data: {
          quesId: id,
          question: elem.question,
          answer: elem.rightAnswer,
          optionA: elem.optionA,
          optionB: elem.optionB,
          optionC: elem.optionC,
          visible: elem.visible == 'yes' ? true : false,
        },
      });
    });
  }
};

export default getFirebase;
