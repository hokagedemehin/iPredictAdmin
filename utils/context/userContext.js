import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { useQuery } from 'react-query';
const qs = require('qs');
// import {
//   useDocument,
//   useDocumentData,
//   useAuthState,
// } from "react-firebase-hooks/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  // const [allDocs, setAllDocs] = useState(null);
  // const [loadingUser, setLoadingUser] = useState(true);

  const query = qs.stringify({
    filters: {
      email: {
        $eq: user?.email,
      },
    },
  });

  const { data, isSuccess } = useQuery(
    ['user-profiles', query],
    async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
      );
    },
    { enabled: !!user }
  );

  useEffect(() => {
    if (data?.data.data.length > 0) {
      setUserDoc(data?.data?.data[0].attributes);
    }
  }, [isSuccess, data, user]);

  useEffect(() => {
    const authSub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // console.log(user);
          const { uid, email } = user;
          // console.log(uid, email);

          setUser({ uid, email });

          // onSnapshot(doc(db, 'Users', uid), (docUser) => {
          //   setUserDoc(docUser.data());
          // });
          // console.log(userDoc);
        } else {
          setUser(null);
          setUserDoc(null);
          // setAllDocs(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoadingUser(false);
      }
    });
    return () => authSub();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userDoc }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
