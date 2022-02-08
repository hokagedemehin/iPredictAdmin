import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const SetApiCount = async (docName) => {
  const docID = docName;
  const collectionRef = doc(db, 'APICount', docID);
  await setDoc(
    collectionRef,
    {
      updatedAt: serverTimestamp(),
      count: increment(1),
    },
    { merge: true }
  );
};

export default SetApiCount;
