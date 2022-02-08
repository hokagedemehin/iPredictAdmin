import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetAllHistories = async () => {
  const transactionsRef = collection(db, `Transactions`);
  const transactionData = query(transactionsRef, orderBy('createdAt', 'desc'));
  const transactionsSnapshot = await getDocs(transactionData);
  return transactionsSnapshot;
};

export default GetAllHistories;
