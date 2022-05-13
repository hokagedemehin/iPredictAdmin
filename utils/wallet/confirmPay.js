import axios from 'axios';
import { nanoid } from 'nanoid';
// import { doc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';

const confirmPay = async (setIsLoading, rowInfo) => {
  try {
    // console.log(rowInfo);
    setIsLoading(true);
    // ###########################################################
    //* Update the withdraw documents to paid
    // const withdrawalRef = doc(db, 'Withdraws', rowInfo?.ID);
    // // const withdrawalDoc = await getDoc(withdrawalRef);

    // await updateDoc(withdrawalRef, {
    //   transferred: 'yes',
    //   // updatedAt: serverTimestamp(),
    // });
    // ###########################################################

    // ###########################################################
    //* Update the user wallet request to zero
    // const userRef = doc(db, 'Users', rowInfo?.userID);
    // // const userDoc = await getDoc(userRef);

    // await updateDoc(userRef, {
    //   request: 0,
    // });
    // ###########################################################

    // ########## update the withdraw statement and
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraws/${rowInfo?.id}`,
      {
        data: {
          transfer: 'yes',
        },
      }
    );

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${rowInfo?.userid}`,
      {
        data: {
          request: 0,
        },
      }
    );

    const id = nanoid();

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories`, {
      data: {
        historyId: id,
        email: rowInfo?.email,
        fullName: rowInfo?.fullName,
        coins: 0,
        money: rowInfo?.amount,
        activity: '',
        type: 'Withdrawal Payment',
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default confirmPay;
