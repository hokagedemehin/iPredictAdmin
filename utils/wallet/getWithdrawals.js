import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetWithdrawals = async () => {
  const witdrawRef = collection(db, `Withdraws`);
  const withdrawData = query(witdrawRef, orderBy('createdAt', 'desc'));
  const withdrawSnapshot = await getDocs(withdrawData);
  return withdrawSnapshot;
};

export default GetWithdrawals;
