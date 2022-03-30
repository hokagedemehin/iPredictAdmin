// import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { Button } from 'antd';
import { Button, Image, Text } from '@chakra-ui/react';
// import { DownloadOutlined } from '@ant-design/icons';
import { BiCloudUpload } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai';
// import styles from '../styles/Home.module.css';
// import { Upload, message, Button as Buttons } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
const MutationPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      slider.update();
    });
  });
  const config = { childList: true };

  slider.on('created', () => {
    observer.observe(slider.container, config);
  });
  slider.on('destroyed', () => {
    observer.disconnect();
  });
};

const AddMagazineHomeComponentSlider = () => {
  const [loaded, setLoaded] = useState(false);
  const [slides, setSlides] = useState([{ pageNumber: 1 }]);
  // const [imageSrc, setImageSrc] = useState();
  console.log('slides :>> ', slides);

  useEffect(() => {}, [slides]);

  function handleOnChange(changeEvent, slide) {
    // console.log(slide);
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // setImageSrc(onLoadEvent.target.result);
      const currentIndex = slides.findIndex((elem) => elem.pageNumber == slide);
      slides[currentIndex]['imageURL'] = onLoadEvent.target.result;
    };

    try {
      reader.readAsDataURL(changeEvent.target.files[0]);
    } catch (error) {
      console.error(error);
    }
  }

  //   const handleImagePreview = (reader, slide) => {
  // const currentIndex = slides.findIndex((elem) => elem.pageNumber == slide);
  // slides[currentIndex]['imageURL'] = reader?.result;
  //   };

  const [refCallback, instanceRef] = useKeenSlider(
    {
      initial: 0,
      // slideChanged(slider) {
      //   setCurrentSlide(slider.track.details.rel);
      //   // console.log(slider);
      // },
      created() {
        setLoaded(true);
      },
      // loop: true,
      // mode: 'free',
      slides: {
        perView: 1,
        spacing: 5,
      },
      breakpoints: {
        '(min-width: 480px)': {
          slides: { perView: 1, spacing: 5 },
        },
        '(min-width: 600px)': {
          slides: { perView: 2, spacing: 7 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 10 },
        },
      },
    },
    [MutationPlugin]
  );
  // console.log('instanceRef: ', instanceRef.current.track.details.slides.length);

  function Arrow(props) {
    const disabled = props.disabled ? ' text-gray-300' : '';
    return (
      <div
        onClick={props.onClick}
        className={`h-10 w-10 cursor-pointer  text-black  ${
          props.left ? 'arrow--left' : 'arrow--right'
        } ${disabled}`}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        {props.left && (
          // <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
          <ChevronLeftIcon w={10} h={10} />
        )}
        {!props.left && (
          // <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
          <ChevronRightIcon w={10} h={10} />
        )}
      </div>
    );
  }

  return (
    <div className='relative space-y-5 pb-5'>
      <div className=' flex h-full w-full flex-col items-center justify-center'>
        <div className='buttons-here flex items-center justify-center space-x-5'>
          <Button
            colorScheme='red'
            variant='outline'
            leftIcon={<AiOutlineClose />}
            isFullWidth
            fontSize='lg'
            // size='lg'
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
            fontSize='lg'
            // size='lg'
            onClick={() =>
              setSlides([...slides, { pageNumber: slides.length + 1 }])
            }
          >
            Add Page
          </Button>
        </div>
      </div>
      <div
        ref={refCallback}
        className='keen-slider min-h-[20rem]  text-center  font-bold '
      >
        {slides.map((slide) => (
          <div
            className={`keen-slider__slide flex flex-col `}
            key={slide.pageNumber}
          >
            <Text className='py-1 text-center'>Page {slide.pageNumber}</Text>
            <div className='flex w-full flex-col space-y-3'>
              <div className='image-display h-full'>
                <Image
                  src={slide?.imageURL}
                  borderRadius='md'
                  className='h-full w-full'
                  // boxSize={['200px', '300px']}
                  objectFit='cover'
                  alt='No search result'
                  fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
                />
              </div>
              <div className='buttons-here flex flex-col items-center justify-center space-y-4 space-x-3'>
                <input
                  name='file'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleOnChange(e, slide?.pageNumber)}
                />
                <Button
                  colorScheme='teal'
                  variant='solid'
                  rightIcon={<BiCloudUpload />}
                  // isFullWidth
                  // fontSize='lg'
                >
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loaded && instanceRef?.current && (
        <div className='absolute inset-y-1/2 flex w-full items-center justify-between'>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            // disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            // disabled={currentSlide === slides.length}
            // disabled={
            //   currentSlide ===
            //   instanceRef.current.track.details.slides.length - 1
            // }
          />
        </div>
      )}
    </div>
  );
};

export default AddMagazineHomeComponentSlider;

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
