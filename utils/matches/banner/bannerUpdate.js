import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const BannerUpdate = async (formValue, setButtonLoad) => {
  // const docID = docName;
  try {
    setButtonLoad(true);
    const collectionRef = doc(db, 'Prize&People', 'values');
    await setDoc(
      collectionRef,
      {
        prize: formValue.prize,
        people: formValue.people,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  } finally {
    setButtonLoad(false);
  }
};

export default BannerUpdate;
