/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../utils/firebase/firebase';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const LoginComponent = () => {
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  // const { user } = useUser();
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const email = formValue.email;
      const password = formValue.password;

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error('💥Incorrect Email or Password! 😪😥💥');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  const handleShow = () => setShow(!show);

  return (
    <div>
      <div>
        <div className='bg-white py-6 sm:py-8 lg:py-12'>
          <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
            <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8'>
              Login
            </h2>

            <form className='max-w-lg border rounded-lg mx-auto'>
              <div className='flex flex-col gap-4 p-4 md:p-8'>
                <div>
                  <label
                    htmlFor='email'
                    className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    onChange={(e) => handleChange(e)}
                    className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                  />
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                  >
                    Password
                  </label>
                  {/* <input
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  /> */}
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      name='password'
                      onChange={(e) => handleChange(e)}
                      // className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                    <InputRightElement>
                      <Button size='sm' variant='ghost' onClick={handleShow}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>

                {/* <button
                  onClick={(e) => loginUser(e)}
                  className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Log in
                </button> */}
                <div className='flex my-5'>
                  <Button
                    // leftIcon={<BiMailSend />}
                    colorScheme='blue'
                    variant='solid'
                    isFullWidth
                    fontSize='xl'
                    // onClick={handleSubmission}
                    isLoading={isLoading}
                    loadingText='Sending'
                    spinnerPlacement='end'
                    onClick={(e) => loginUser(e)}
                  >
                    Log in
                  </Button>
                </div>
              </div>

              <div className='flex flex-col space-y-2 justify-center items-center bg-gray-100 p-4'>
                <p className='text-gray-500 text-sm text-center'>
                  Forgot Password?{' '}
                  <a
                    href='!#'
                    onClick={(e) => handleClick(e, '/reset')}
                    className='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100'
                  >
                    Reset
                  </a>
                </p>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
