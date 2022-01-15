import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetAllPredictions = async (Id) => {
  // get the selected prediction amongs all the predictions in the parent collection
  const matchRef = doc(db, 'PredictedMatches', Id);
  // const q = query(matchRef, orderBy("createdAt", "asc"));
  const docSnapshot = await getDoc(matchRef);

  // const newArr = [];
  // setPredictions(docSnapshot.data());
  // if (newArr.length !== 0) {
  //   (newArr);
  // }
  return docSnapshot.data();
};

export default GetAllPredictions;
