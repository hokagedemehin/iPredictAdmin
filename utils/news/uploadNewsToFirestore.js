import {
  // addDoc,
  doc,
  setDoc,
  collection,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const UploadNewsToFirestore = async (news, section, setIsLoadings) => {
  try {
    setIsLoadings(true);
    const newsCollectionRef = doc(db, 'News&Transfers', 'allNews');

    const newsRef = collection(db, 'News&Transfers', 'allNews', section);
    const allIDs = await getDoc(newsCollectionRef);
    // const idsArray = allIDs.data()[`${section}`];
    const idsArray = allIDs.data();

    // const newsSetRef = doc(newsRef);
    // console.log(newsSetRef.id);
    news.forEach(async (newss) => {
      if (!allIDs.exists() || !idsArray[`${section}`]) {
        // await addDoc(newsRef, {
        //   id: newss?.id,
        //   title: newss?.title,
        //   body: newss?.body,
        //   publishedAt: newss?.published_at,
        //   image: newss?.image,
        //   createdBy: newss?.created_by,
        // });
        const newsSetRef = doc(newsRef);
        await setDoc(newsSetRef, {
          docID: newsSetRef.id,
          id: newss?.id,
          title: newss?.title,
          body: newss?.body,
          publishedAt: newss?.published_at,
          image: newss?.image,
          createdBy: newss?.created_by,
          section: section,
        });

        await setDoc(
          newsCollectionRef,
          {
            [section]: arrayUnion(newss?.id),
          },
          { merge: true }
        );
      } else if (!idsArray[`${section}`].includes(newss?.id)) {
        // await addDoc(newsRef, {
        //   id: newss?.id,
        //   title: newss?.title,
        //   body: newss?.body,
        //   publishedAt: newss?.published_at,
        //   image: newss?.image,
        //   createdBy: newss?.created_by,
        // });
        const newsSetRef = doc(newsRef);
        await setDoc(newsSetRef, {
          docID: newsSetRef.id,
          id: newss?.id,
          title: newss?.title,
          body: newss?.body,
          publishedAt: newss?.published_at,
          image: newss?.image,
          createdBy: newss?.created_by,
          section: section,
        });

        await setDoc(
          newsCollectionRef,
          {
            [section]: arrayUnion(newss?.id),
          },
          { merge: true }
        );
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadings(false);
  }
};

export default UploadNewsToFirestore;
