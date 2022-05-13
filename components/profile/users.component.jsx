import React from 'react';
import { useRouter } from 'next/router';

import UsersImageComponent from './users.image.component';
import { Button, Skeleton } from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import { motion } from 'framer-motion';

const ProfilePageComponent = ({ userDoc }) => {
  const MotionButton = motion(Button);
  const {
    email,
    firstName,
    lastName,

    phoneNo,
    birthDay,
  } = !userDoc ? {} : userDoc;

  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
    // console.log("router: ", router.pathname);
  };
  return (
    <div className=''>
      <div className=''>
        <div className='mx-auto my-5 max-w-screen-xl p-5'>
          <div className='m-5 text-center'>
            <span className='text-4xl font-black text-gray-400'>Your </span>{' '}
            <span className='text-4xl font-black text-indigo-500 '>
              {' '}
              Profile
            </span>
          </div>
          <div className='no-wrap md:-mx-2 md:flex '>
            {/* <!-- Left Side --> */}
            <div className='w-full md:mx-2 md:w-3/12'>
              {/* <!-- Profile Card --> */}
              <UsersImageComponent userDoc={userDoc} />
              {/* <!-- End of profile card --> */}
              <div className='my-4'></div>
            </div>
            {/* <!-- Right Side --> */}
            <div className='h-full w-full md:mx-2 md:w-9/12 '>
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}
              <div className='rounded-lg border-t-4 border-indigo-400 bg-white p-3 shadow-md'>
                <div className='flex items-center space-x-2 font-semibold leading-8 text-gray-900'>
                  <span className='text-gray-500'>
                    <svg
                      className='h-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </span>
                  <span className='tracking-wide'>About</span>
                </div>
                <div className='text-gray-700'>
                  <div className='grid text-sm sm:text-lg md:grid-cols-2'>
                    <div className='grid grid-cols-6'>
                      <div className=' col-span-2 py-2 font-semibold'>
                        First Name:
                      </div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{firstName}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' col-span-3 py-2'>{firstName}</div>
                      )}
                    </div>
                    <div className='grid grid-cols-6'>
                      <div className=' col-span-2 py-2 font-semibold'>
                        Last Name:
                      </div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{lastName}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' col-span-4 py-2'>{lastName}</div>
                      )}
                    </div>

                    <div className='grid grid-cols-6'>
                      <div className=' col-span-2 py-2 font-semibold'>
                        Phone No:
                      </div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{phoneNo}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' col-span-4 py-2'>
                          {!phoneNo ? '+11 998001001' : phoneNo}
                        </div>
                      )}
                    </div>

                    <div className='grid grid-flow-row grid-cols-10'>
                      <div className=' col-span-2 w-fit py-2 font-semibold'>
                        Email:
                      </div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{email}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' col-span-8 w-full py-2'>{email}</div>
                      )}
                    </div>
                    <div className='grid grid-cols-7'>
                      <div className=' col-span-2 py-2 font-semibold'>
                        Birthday:
                      </div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2 '>{birthDay}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' col-span-5 py-2'>
                          {!birthDay ? '1 Jan' : birthDay}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <MotionButton
                    onClick={(e) => handleClick(e, '/profile/edit')}
                    variant='outline'
                    rightIcon={<BiEditAlt />}
                    // drag='x'
                    // dragConstraints={{ left: -100, right: 100 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Edit Profile
                  </MotionButton>
                </div>
              </div>
              {/* <!-- End of about section --> */}

              <div className='my-4'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
