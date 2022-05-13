// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';

const GetAllHistories = async () => {
  // const transactionsRef = collection(db, `Transactions`);
  // const transactionData = query(transactionsRef, orderBy('createdAt', 'desc'));
  // const transactionsSnapshot = await getDocs(transactionData);
  // return transactionsSnapshot;
  const query = qs.stringify(
    {
      sort: ['id:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories?${query}`
  );
  return data?.data;
};

export default GetAllHistories;
