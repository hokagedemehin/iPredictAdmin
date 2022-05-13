import { Text } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useQuery } from 'react-query';
const ViewOneQuestionComponent = ({ ques }) => {
  const router = useRouter();
  // console.log(ques?.ID);
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  // const [eyeVisible, setEyeVisible] = useState(ques?.visible);
  // const [eyeVisible, setEyeVisible] = useState(true);
  const { data: newData, isSuccess } = useQuery(
    ['just-one-questions', ques?.ID],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias/${ques?.ID}`
      );
      return data?.data;
    }
  );

  // console.log('newData', newData);

  useEffect(() => {
    if (isSuccess && newData) {
      // console.log(newData?.data?.data?.attributes);
      setEyeVisible(newData?.attributes?.visible);
    }
  }, [isSuccess, newData]);

  const [eyeVisible, setEyeVisible] = useState(null);

  // console.log('eyeVisible', ques?.visible);
  // console.log('eyeVisible', eyeVisible);

  const changeVisibility = async () => {
    // console.log('change eye');
    setEyeVisible(!eyeVisible);
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias/${ques?.ID}`,
      { data: { visible: !eyeVisible } }
    );
    // setEyeVisible(!ques?.visible);
  };
  return (
    <div>
      <div className='flex  items-center justify-between space-x-2 rounded-lg p-3 shadow-md '>
        <Text
          onClick={(e) => handleClick(e, `/triviagame/questions/${ques?.ID}`)}
          isTruncated
          fontSize='lg'
          className='cursor-pointer'
        >
          {ques?.question}
        </Text>
        {/* {ques?.visible ? ( */}
        {eyeVisible ? (
          <div className='cursor-pointer' onClick={() => changeVisibility()}>
            <FaRegEye className='text-xl text-teal-600' />
          </div>
        ) : (
          <div className='cursor-pointer' onClick={() => changeVisibility()}>
            <FaRegEyeSlash className='text-xl text-red-600' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOneQuestionComponent;
