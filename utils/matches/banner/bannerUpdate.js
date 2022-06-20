import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerUpdate = async (formValue, setButtonLoad) => {
  // const docID = docName;
  try {
    setButtonLoad(true);

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners`,
      {
        data: {
          prize: formValue?.prize,
          people: formValue?.people,
          coins: formValue?.coins,
        },
      }
    );
    toast.success('Added to Database Successfully');
  } catch (error) {
    console.error(error);
  } finally {
    setButtonLoad(false);
  }
};

export default BannerUpdate;
