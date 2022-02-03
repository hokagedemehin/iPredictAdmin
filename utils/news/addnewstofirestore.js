import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { nanoid } from 'nanoid';
const AddNewsToFirestore = async (news, setLoading) => {
  try {
    setLoading(true);
    const ID = nanoid();
    const nowDate = new Date();
    // const docID = Date.now().toString();

    const newsRef = doc(db, 'News&Transfers', ID);
    await setDoc(newsRef, { ...news, AA: ID, ACreated: nowDate });
    // await setDoc(newsRef, data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export default AddNewsToFirestore;
