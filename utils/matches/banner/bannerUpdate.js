import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners`,
      {
        data: {
          prize: formValue.prize,
          people: formValue.people,
        },
      }
    );
    toast.success('Added to Database Successfully');
  } catch (error) {
    console.error(error);
  } finally {
    setButtonLoad(false);
  }
};

export default BannerUpdate;
