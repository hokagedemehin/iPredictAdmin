import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetApiCount = async (docName) => {
  const apiRef = doc(db, `APICount`, docName);

  const apiData = await getDoc(apiRef);
  // console.log('apiData', apiData.data());
  return apiData.data();
};

export default GetApiCount;
