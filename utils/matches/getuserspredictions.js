import { db } from '../firebase/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const GetUsersPredictions = async (Id, pred, email) => {
  // get all the predictions this specific users made for this specific match selection (ID)
  // pred.forEach(async (match) => {
  const predictedMatchRef = collection(db, `${email}-matches`, Id, pred);
  const q = query(predictedMatchRef, orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(q);

  // const newArr = [];
  // querySnapshot.forEach((doc) => newArr.push(doc.data()));
  // if (newArr.length !== 0) {
  //   setUsersPredictions(newArr);
  // }
  // // });
  return querySnapshot;
};

export default GetUsersPredictions;
