import axios from 'axios';

const NewUploadMagazine = async (
  formValue,
  magazinePages,
  setFirebaseLoading
) => {
  try {
    setFirebaseLoading(true);
    // ****************************************
    // ****************************************
    const { data: magazine } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines`,
      {
        data: {
          name: formValue?.magazineName,
          pages: formValue?.pageNumbers,
          cover: magazinePages?.cover,
        },
      }
    );
    for (const [key, value] of Object.entries(magazinePages)) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazine-pages`,
        {
          data: {
            page: key,
            imageURL: value,
            name: formValue?.magazineName,
            magazine: [magazine?.data?.id],
          },
        }
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    setFirebaseLoading(false);
  }
};

export default NewUploadMagazine;
