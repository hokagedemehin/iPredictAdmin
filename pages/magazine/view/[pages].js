import { Button, Heading } from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/context/userContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, Keyboard } from 'swiper';

const AllMagazinePages = ({ data: allMags }) => {
  const router = useRouter();
  const { userDoc } = useUser();

  // console.log('allMags :>> ', allMags);

  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='View Magazine' desc='See all Pages of a particular magazine'>
      <NavHeader />
      <div className='mx-2 pb-5'>
        <div className='flex w-full items-center justify-center '>
          <div className='mb-5 w-full text-center'>
            <div className='mx-4 flex w-full'>
              <Button
                leftIcon={<BiArrowBack />}
                variant='ghost'
                onClick={() => router.push('/magazine/view')}
              >
                Back
              </Button>
            </div>
            <Heading>{allMags[0].attributes?.name}</Heading>
          </div>
        </div>
        <Swiper
          // effect={'fade'}
          navigation={true}
          modules={[Navigation, Keyboard]}
          className='mySwipe'
          loop={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }}
          keyboard={{
            enabled: true,
          }}
        >
          {allMags &&
            allMags?.map((onePage, index) => (
              <SwiperSlide key={index}>
                <div className='relative bg-white '>
                  {/* large screen image */}
                  <div className='hidden h-[25rem] w-full sm:relative sm:block sm:h-[35rem]'>
                    <Image
                      src={onePage?.attributes?.imageURL}
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      alt={onePage?.attributes?.page}
                      blurDataURL={onePage?.attributes?.imageURL}
                    />
                  </div>
                  {/* small screen image */}
                  <div className='relative block h-[25rem] w-full sm:hidden sm:h-[35rem]'>
                    <Image
                      src={onePage?.attributes?.imageURL}
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      alt={onePage?.attributes?.page}
                      blurDataURL={onePage?.attributes?.imageURL}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* <div className='relative h-80 w-full'>
          <Image
            layout='fill'
            objectFit='cover'
            src={allMags[0].attributes?.imageURL}
            alt={allMags[0].attributes?.page}
          />
        </div> */}
      </div>
    </Layout>
  );
};

export default AllMagazinePages;

export async function getServerSideProps({ params }) {
  // console.log('params :>> ', params);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines/${params.pages}?populate=*`
  );
  return {
    props: {
      data: data?.data?.attributes?.magazine_pages?.data,
      cover: data?.data?.attributes?.cover,
    },
  };
}

/**
 * <SwiperSlide>
  <div className='relative bg-white'>

    <div className='hidden h-[30rem] w-full sm:relative sm:block sm:h-[50rem]'>
      <Image
        src={cover}
        layout='fill'
        objectFit='contain'
        placeholder='blur'
        alt='Magazine Cover'
        blurDataURL={cover}
      />
    </div>

    <div className='relative block h-[30rem] w-full sm:hidden sm:h-[50rem]'>
      <Image
        src={cover}
        layout='fill'
        objectFit='cover'
        placeholder='blur'
        alt='Magazine Cover'
        blurDataURL={cover}
      />
    </div>
  </div>
</SwiperSlide>;
 */
