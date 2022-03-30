import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
const ViewOneQuestionComponent = ({ ques }) => {
  const router = useRouter();
  // console.log(ques);
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <div>
      <div
        className='flex cursor-pointer items-center justify-between space-x-2 rounded-lg p-3 shadow-md '
        onClick={(e) => handleClick(e, `/triviagame/questions/${ques?.ID}`)}
      >
        <Text isTruncated fontSize='lg'>
          {ques?.question}
        </Text>
        {ques?.visible == 'yes' ? (
          <div>
            <FaRegEye className='text-xl text-teal-600' />
          </div>
        ) : (
          <div>
            <FaRegEyeSlash className='text-xl text-red-600' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOneQuestionComponent;
