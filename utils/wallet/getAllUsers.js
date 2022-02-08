import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetAllUsers = async () => {
  const usersRef = collection(db, `Users`);
  const userData = query(usersRef, orderBy('createdAt', 'desc'));
  const usersSnapshot = await getDocs(userData);
  return usersSnapshot;
};

export default GetAllUsers;
