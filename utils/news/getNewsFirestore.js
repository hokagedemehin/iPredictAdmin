import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
const GetNewsFirestore = async () => {
  // console.log('uid', user?.uid);
  // const = doc(db, 'Users', user?.uid);/
  const footballNews = collection(db, 'News&Transfers', 'allNews', 'Football');
  const transferNews = collection(db, 'News&Transfers', 'allNews', 'Transfers');
  const uefaNews = collection(db, 'News&Transfers', 'allNews', 'UEFA');

  const footballSort = query(footballNews, orderBy('id', 'desc'));
  const transferSort = query(transferNews, orderBy('id', 'desc'));
  const uefaSort = query(uefaNews, orderBy('id', 'desc'));

  const footballSnapshot = await getDocs(footballSort);
  const transferSnapshot = await getDocs(transferSort);
  const uefaSnapshot = await getDocs(uefaSort);

  const finalData = {
    football: footballSnapshot,
    transfer: transferSnapshot,
    uefa: uefaSnapshot,
  };

  // console.log('finalData', finalData);

  return finalData;
};

export default GetNewsFirestore;
