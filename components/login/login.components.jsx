/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../utils/firebase/firebase";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

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
      toast.error("💥Incorrect Email or Password! 😪😥💥");
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
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
              Login
            </h2>

            <form className="mx-auto max-w-lg rounded-lg border">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
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
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      // className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                    <InputRightElement>
                      <Button size="sm" variant="ghost" onClick={handleShow}>
                        {show ? "Hide" : "Show"}
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
                <div className="my-5 flex">
                  <Button
                    // leftIcon={<BiMailSend />}
                    colorScheme="blue"
                    variant="solid"
                    isFullWidth
                    fontSize="xl"
                    // onClick={handleSubmission}
                    isLoading={isLoading}
                    loadingText="Sending"
                    spinnerPlacement="end"
                    onClick={(e) => loginUser(e)}
                  >
                    Log in
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Forgot Password?{" "}
                  <a
                    href="!#"
                    onClick={(e) => handleClick(e, "/reset")}
                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
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
