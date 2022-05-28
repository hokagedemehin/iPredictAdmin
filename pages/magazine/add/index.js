import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import MagazineEmptyComponent from '../../../components/emptypages/magazine.empty';
import Layout from '../../../components/layout/layout';
import AddMagazineHomeComponentForm from '../../../components/magazine/add/addmagazine.componentform';
// import AddMagazineHomeComponent from '../../../components/magazine/add/addmagazine.component';
// import AddMagazineHomeComponentSlider from '../../../components/magazine/add/addmagazine.componentslider';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/context/userContext';
import { ArrowBackIcon } from '@chakra-ui/icons';

const AddMagazinePage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className='mx-2'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/magazine')}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>Add News Magazine</Heading>
        </div>

        {/* <MagazineEmptyComponent /> */}
        <AddMagazineHomeComponentForm />
      </div>
    </Layout>
  );
};

export default AddMagazinePage;
