// import Head from 'next/head';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

import {
  AiOutlineClose,
  AiOutlineCloudServer,
  AiOutlineFileAdd,
  AiOutlineCloudUpload,
} from 'react-icons/ai';
import axios from 'axios';
// import UploadMagazine from '../../../utils/magazine/uploadMagazine';
import PuffLoader from 'react-spinners/PuffLoader';
import NewUploadMagazine from '../../../utils/magazine/newUploadMagazine';
import { useRouter } from 'next/router';

const AddMagazineHomeComponentForm = () => {
  const router = useRouter();
  const [slides, setSlides] = useState([{ pageNumber: 1 }]);
  const [imgValue, setImgValue] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(false);
  // const [pdfValue, setPdfValue] = useState(null);
  const [magazinePages, setMagazinePages] = useState({});
  // const formData = new FormData();
  // console.log('imgValue: ', imgValue);
  // console.log('formValue: ', formValue);
  // console.log('magazinePages :>> ', magazinePages);
  // console.log('pdfValue :>> ', pdfValue.magazinepdf.name);

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

  // const handlePDFForm = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.files[0];
  //   setPdfValue({ [name]: value });
  // };

  const handleRemove = (slides) => {
    setSlides(slides.slice(0, -1));
    // console
    // setImgValue(imgValue.slice(0, -1));
    let newData = { ...imgValue };
    delete newData[`page${Object.keys(imgValue).length}`];
    setImgValue(newData);
  };

  // const handleImages = () => {};

  const handleCloudinarySubmit = async () => {
    'POST https://api.cloudinary.com/v1_1/demo/image/upload';
    let newObj = {};

    for (const [key, value] of Object.entries(imgValue)) {
      // console.log('value: ', value);
      setLoadingState(true);
      let formData = new FormData();
      formData.append('file', value);
      formData.append('upload_preset', 'ipredict-magazine');
      // console.log('formData', formData);
      let response = await axios.post(
        'https://api.cloudinary.com/v1_1/ipredict/image/upload',
        formData
        // { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      newObj[key] = response?.data?.secure_url;
    }
    setMagazinePages(newObj);
    // setFormValue({ ...formValue, ...newObj });
    setLoadingState(false);

    // console.log('newObj', newObj);
    // console.log('upload to firestore last');
  };

  const handleFirebaseUpload = async () => {
    // await UploadMagazine(formValue, setFirebaseLoading, pdfValue);
    await NewUploadMagazine(formValue, magazinePages, setFirebaseLoading);
    router.push('/magazine/view');
  };

  return (
    <div className='relative mx-auto max-w-xl space-y-5 pb-5'>
      <div className='form-container space-y-4'>
        <div className='flex'>
          <Input
            id='magazineName'
            type='text'
            name='magazineName'
            placeholder='Name of Magazine...'
            onChange={(e) => handleForm(e)}
          />
        </div>

        <div className='item flex space-x-4'>
          <NumberInput min={1} max={1000}>
            <NumberInputField
              id='pageNumbers'
              name='pageNumbers'
              placeholder='Number of Pages...'
              onChange={(e) => handleForm(e)}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className='flex'>
          <FormControl>
            <FormLabel htmlFor={`cover`}>Cover</FormLabel>
            <input
              name={`cover`}
              id={`cover`}
              type='file'
              accept='image/*'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
        </div>
        {/* <div className='flex'>
          <FormControl>
            <FormLabel htmlFor='magazinepdf'>Magazine File (.pdf)</FormLabel>
            <input
              id='magazinepdf'
              name='magazinepdf'
              type='file'
              accept='.pdf'
              onChange={(e) => handlePDFForm(e)}
            />
          </FormControl>
          <label htmlFor='magazinepdf'></label>
        </div> */}
        <div className='flex flex-col space-y-5'>
          {slides.map((slide) => (
            <div className='flex' key={slide.pageNumber}>
              <FormControl>
                <FormLabel htmlFor={`page${slide.pageNumber}`}>
                  Page {slide.pageNumber}
                </FormLabel>
                <input
                  name={`page${slide.pageNumber}`}
                  id={`page${slide.pageNumber}`}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center space-x-5'>
          <Button
            colorScheme='red'
            variant='outline'
            leftIcon={<AiOutlineClose />}
            // isFullWidth
            // fontSize='lg'
            size='sm'
            disabled={slides.length < 2}
            onClick={() => handleRemove(slides)}
          >
            Remove Image
          </Button>
          <Button
            colorScheme='teal'
            variant='solid'
            leftIcon={<AiOutlineFileAdd />}
            // isFullWidth
            // fontSize='lg'
            size='sm'
            onClick={() =>
              setSlides([...slides, { pageNumber: slides.length + 1 }])
            }
          >
            Add Image
          </Button>
        </div>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <Button
            colorScheme='blue'
            variant='outline'
            rightIcon={<AiOutlineCloudUpload />}
            // isFullWidth
            // fontSize='lg'
            // size='sm'
            // disabled={slides.length < 2}
            isLoading={loadingState}
            loadingText='Uploading...'
            spinner={<PuffLoader size={20} />}
            onClick={() => handleCloudinarySubmit()}
          >
            Upload to Cloudinary
          </Button>
          <Button
            colorScheme='teal'
            variant='solid'
            rightIcon={<AiOutlineCloudServer />}
            // isFullWidth
            // fontSize='lg'
            // size='sm'
            // disabled={slides.length < 2}
            isLoading={firebaseLoading}
            loadingText='Uploading...'
            spinner={<PuffLoader size={20} />}
            onClick={() => handleFirebaseUpload()}
          >
            Upload to Database
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMagazineHomeComponentForm;

/****
 * 
 *<div className={`keen-slider__slide min-h-full`}>
          <div className=' flex h-full w-full flex-col items-center justify-center'>
            <div className='buttons-here flex  flex-col items-center justify-center space-y-5'>
              <Button
                colorScheme='red'
                variant='outline'
                leftIcon={<AiOutlineClose />}
                isFullWidth
                fontSize='2xl'
                size='lg'
                disabled={slides.length < 2}
                onClick={() => setSlides(slides.slice(0, -1))}
              >
                Remove Page
              </Button>
              

              <Button
                colorScheme='linkedin'
                variant='solid'
                leftIcon={<AiOutlineFileAdd />}
                isFullWidth
                fontSize='2xl'
                size='lg'
                onClick={() => setSlides([...slides, slides.length + 1])}
              >
                Add Page
              </Button>
            </div>
          </div>
        </div>
        
 *  <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          2
        </div>
        <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          3
        </div>
        <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          4
        </div>
        <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          5
        </div>
        <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          6
        </div>
        <div className='keen-slider__slide flex min-h-full items-center justify-center ring-1'>
          7
        </div>
 * 

 *     
    const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList[0]?.response);
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    // console.log(src);
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


  <div className='flex ring-1'>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        className='w-full'
      >
        {fileList && '+ Upload'}
      </Upload>
    </div>
    */
