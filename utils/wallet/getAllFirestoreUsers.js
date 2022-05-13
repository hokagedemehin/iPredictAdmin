import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import axios from 'axios';
const qs = require('qs');

const GetAllFirestoreUsers = async (setIsLoadings) => {
  try {
    setIsLoadings(true);
    const usersRef = collection(db, `Users`);
    const userData = query(usersRef, orderBy('createdAt', 'desc'));
    const usersSnapshot = await getDocs(userData);

    usersSnapshot.forEach(async (user) => {
      // console.log('email', user.data().email);
      const checkQueries = qs.stringify(
        {
          filters: {
            email: {
              $eq: user.data().email,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${checkQueries}`
      );

      if (data?.data.length == 0) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles`,
          {
            data: {
              firstName: user.data().firstName,
              lastName: user.data().lastName,
              email: user.data().email,
              phoneNo: user.data().phoneNo,
              birthDay: user.data().birthDay,
              image: user.data().image,
              role: user.data().role,
              coins: user.data().coins,
              money: user.data().money,
              request: user.data().request,
              referralCode: user.data().referralCode,
              referralPoints: user.data().referralPoints,
            },
          }
        );
      }
    });
    // return usersSnapshot;

    // const querys = qs.stringify(
    //   {
    //     sort: ['id:desc'],
    //   },
    //   {
    //     encodeValuesOnly: true,
    //   }
    // );
    // const { data } = await axios.get(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${querys}`
    // );
    // return data?.data;
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadings(false);
  }
};

export default GetAllFirestoreUsers;
