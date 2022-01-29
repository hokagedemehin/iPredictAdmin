import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const GetAllTriviaAttempts = async () => {
  const triviaAttemptsRef = collection(db, `TriviaAttempts`);
  const orderData = query(triviaAttemptsRef, orderBy('createdAt', 'desc'));
  const triviaAttemptSnapshot = await getDocs(orderData);
  return triviaAttemptSnapshot;
};

export default GetAllTriviaAttempts;
