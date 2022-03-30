import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const confirmPay = async (setIsLoading, rowInfo) => {
  try {
    setIsLoading(true);
    // ###########################################################
    //* Update the withdraw documents to paid
    const withdrawalRef = doc(db, 'Withdraws', rowInfo?.ID);
    // const withdrawalDoc = await getDoc(withdrawalRef);

    await updateDoc(withdrawalRef, {
      transferred: 'yes',
      // updatedAt: serverTimestamp(),
    });
    // ###########################################################

    // ###########################################################
    //* Update the user wallet request to zero
    const userRef = doc(db, 'Users', rowInfo?.userID);
    // const userDoc = await getDoc(userRef);

    await updateDoc(userRef, {
      request: 0,
    });
    // ###########################################################
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default confirmPay;
