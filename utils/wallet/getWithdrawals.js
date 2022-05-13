// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';

const GetWithdrawals = async () => {
  // const witdrawRef = collection(db, `Withdraws`);
  // const withdrawData = query(witdrawRef, orderBy('createdAt', 'desc'));
  // const withdrawSnapshot = await getDocs(withdrawData);
  // return withdrawSnapshot;

  const query = qs.stringify(
    {
      sort: ['id:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraws?${query}`
  );
  return data?.data;
};

export default GetWithdrawals;
