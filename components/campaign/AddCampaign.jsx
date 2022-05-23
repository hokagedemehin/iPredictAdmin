import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineCloudServer, AiOutlineCloudUpload } from 'react-icons/ai';
import PuffLoader from 'react-spinners/PuffLoader';

const AddCampaignPageComponent = () => {
  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
  const [strapiLoading, setStrapiLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    campaignImage: '',
    campaignLink: '',
    buttonName: '',
  });
  const [imgValue, setImgValue] = useState(null);
  console.log('formValue :>> ', formValue);

  const handleForm = (e) => {
    // e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleChange = (e) => {
    // e.preventDefault();
    // console.log('e :>> ', e);
    // const info = e.currentTarget;
    const name = e.target.name;
    const value = e.target.files[0];
    setImgValue({ ...imgValue, [name]: value });
  };

  const handleCloudinarySubmit = async () => {
    let newObj = {};

    for (const [key, value] of Object.entries(imgValue)) {
      // console.log('value: ', value);
      setCloudinaryLoading(true);
      let formData = new FormData();
      formData.append('file', value);
      formData.append('upload_preset', 'ipredict-signed');
      // console.log('formData', formData);
      let response = await axios.post(
        'https://api.cloudinary.com/v1_1/ipredict/image/upload',
        formData
        // { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      newObj[key] = response?.data?.secure_url;
    }
    setFormValue({ ...formValue, ...newObj });
    setCloudinaryLoading(false);
  };

  const handleStrapiSubmit = async () => {
    try {
      setStrapiLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns`, {
        data: {
          name: formValue?.name,
          image: formValue?.campaignImage,
          link: formValue?.campaignLink,
          buttonName: formValue?.buttonName,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFormValue({ name: '', campaignImage: '', campaignLink: '' });
      setStrapiLoading(false);
    }
  };
  return (
    <div>
      <div className='felx mx-auto max-w-lg flex-col space-y-4'>
        {/* name of campaign */}
        <div>
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              id='name'
              // type='name'
              name='name'
              value={formValue?.name}
              onChange={(e) => handleForm(e)}
              required
            />
          </FormControl>
        </div>
        {/* image of campain */}
        <div className='space-y-2'>
          <FormControl isRequired>
            <FormLabel htmlFor='campaignImage'>Image</FormLabel>
            <input
              name='campaignImage'
              id='campaignImage'
              type='file'
              accept='image/*'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <Button
            colorScheme='blue'
            variant='outline'
            rightIcon={<AiOutlineCloudUpload />}
            isLoading={cloudinaryLoading}
            loadingText='Uploading...'
            spinner={<PuffLoader size={20} />}
            onClick={() => handleCloudinarySubmit()}
          >
            Upload to Cloudinary
          </Button>
        </div>
        {/* name of campaign button */}
        <FormControl isRequired>
          <FormLabel htmlFor='buttonName'>Campaign Button Name</FormLabel>
          <Input
            id='buttonName'
            // type='buttonName'
            name='buttonName'
            value={formValue?.buttonName}
            onChange={(e) => handleForm(e)}
            required
          />
        </FormControl>
        {/* link to campaign page */}
        <FormControl isRequired>
          <FormLabel htmlFor='campaignLink'>Campaign Link</FormLabel>
          <Input
            id='campaignLink'
            // type='campaignLink'
            name='campaignLink'
            value={formValue?.campaignLink}
            onChange={(e) => handleForm(e)}
            required
          />
        </FormControl>
        {/* upload buttons */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <Button
            colorScheme='teal'
            variant='solid'
            rightIcon={<AiOutlineCloudServer />}
            isLoading={strapiLoading}
            loadingText='Uploading...'
            spinner={<PuffLoader size={20} />}
            onClick={() => handleStrapiSubmit()}
          >
            Upload to Database
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignPageComponent;
