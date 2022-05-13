// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
import axios from 'axios';
const qs = require('qs');

const GetAllUsers = async () => {
  // const usersRef = collection(db, `Users`);
  // const userData = query(usersRef, orderBy('createdAt', 'desc'));
  // const usersSnapshot = await getDocs(userData);
  // return usersSnapshot;
  const query = qs.stringify(
    {
      sort: ['id:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
  );
  return data?.data;
};

export default GetAllUsers;
