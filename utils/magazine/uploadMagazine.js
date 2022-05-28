import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import {
  // getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

// const storage = getStorage();

const UploadMagazine = async (formValue, setFirebaseLoading, pdfValue) => {
  try {
    setFirebaseLoading(true);
    // ****************************************
    //  ?upload the PDF and get the download URL
    // ****************************************
    // Upload file and metadata to the object 'images/mountains.jpg'
    // let pdfLink = '';
    const metadata = {
      contentType: 'application/pdf',
    };
    const storageRef = ref(storage, 'pdfs/' + pdfValue.magazinepdf.name);
    const uploadTask = uploadBytesResumable(storageRef, pdfValue, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.error(" User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            console.error('User canceled the upload');
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.error(
              'Unknown error occurred, inspect error.serverResponse'
            );
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        await getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL) => {
            console.log('File available at', downloadURL);
            // pdfLink = downloadURL;
            const newMagazineRef = doc(collection(db, 'Magazine'));
            await setDoc(newMagazineRef, {
              ...formValue,
              createdAt: serverTimestamp(),
              docID: newMagazineRef.id,
              magazinePDF: downloadURL,
            });
          }
        );
      }
    );

    // ***************************************************
    // * create a reference for a new document and then add the magazine to firestore and store the ID
    // *****************************************************

    // console.log('formValue firebase :>> ', formValue);
    // const newMagazineRef = doc(collection(db, 'Magazine'));
    // await setDoc(newMagazineRef, {
    //   ...formValue,
    //   createdAt: serverTimestamp(),
    //   docID: newMagazineRef.id,
    //   magazinePDF: pdfLink,
    // });
  } catch (error) {
    console.error(error);
  } finally {
    setFirebaseLoading(false);
  }
};

export default UploadMagazine;
