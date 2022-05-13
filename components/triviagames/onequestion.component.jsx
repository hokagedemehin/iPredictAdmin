import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
// import GetOneQuestionFromFirebase from '../../utils/trivia/getOneQuestion';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
// import { useQuery } from 'react-query';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const OneQuestionComponent = ({ data }) => {
  const router = useRouter();
  const { questionID } = router.query;
  // console.log(questionID);
  // const [question, setQuestion] = useState([]);

  // const getSpecificQuestion = async () => {
  //   await GetOneQuestionFromFirebase(setQuestion, questionID);
  // };

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  // useEffect(() => {
  //   if (questionID) {
  //     getSpecificQuestion();
  //   }
  // }, [questionID]);

  // const { isLoading, data, isSuccess } = useQuery(
  //   ['onequestion', questionID],
  //   async () => await GetOneQuestionFromFirebase(questionID),
  //   { enabled: !!questionID }
  // );

  return (
    <div className='mx-4 mt-4 rounded-xl p-4 shadow-md'>
      {/* {isSuccess && ( */}
      <div className='space-y-4'>
        {/* QUestion */}
        <div className='flex justify-between space-x-2'>
          <p className='text-xl'>{data?.attributes?.question}</p>
          {data?.attributes?.visible ? (
            <div>
              <FaRegEye className='text-2xl text-teal-600' />
            </div>
          ) : (
            <div>
              <FaRegEyeSlash className='text-2xl text-red-600' />
            </div>
          )}
        </div>
        {/* OPtions */}
        <div className='flex flex-col space-y-1'>
          <div className='flex space-x-2'>
            <p>A.</p>
            <p>{data?.attributes?.optionA}</p>
          </div>
          <div className='flex space-x-2'>
            <p>B.</p>
            <p>{data?.attributes?.optionB}</p>
          </div>
          <div className='flex space-x-2'>
            <p>C.</p>
            <p>{data?.attributes?.optionC}</p>
          </div>
          {/* ANswer */}
          <div className='font flex space-x-2'>
            <p>Answer: </p>
            <p>{data?.attributes?.answer}</p>
          </div>
        </div>

        {/* Edit and back button */}
        <div className='flex items-center justify-center space-x-2 sm:space-x-4'>
          <Button
            isFullWidth
            colorScheme='teal'
            variant='outline'
            leftIcon={<BiArrowBack />}
            fontSize='xl'
            onClick={() => router.push('/triviagame/questions')}
          >
            Back
          </Button>
          <Button
            isFullWidth
            colorScheme='linkedin'
            variant='solid'
            rightIcon={<AiOutlineEdit />}
            fontSize='xl'
            onClick={(e) =>
              handleClick(e, `/triviagame/questions/edit/${questionID}`)
            }
          >
            Edit
          </Button>
        </div>
      </div>
      {/* )} */}
      {/* {isLoading && (
        <div className='space-y-6'>
         
          <Skeleton className='flex h-20'>
            <p className='text-xl'>{data?.question}</p>
          </Skeleton>
         
          <div className='flex flex-col space-y-1'>
            <Skeleton className='flex space-x-2'>
              <p>A.</p>
              <p>{data?.optionA}</p>
            </Skeleton>
            <Skeleton className='flex space-x-2'>
              <p>B.</p>
              <p>{data?.optionB}</p>
            </Skeleton>
            <Skeleton className='flex space-x-2'>
              <p>C.</p>
              <p>{data?.optionC}</p>
            </Skeleton>
           
            <Skeleton className='font flex space-x-2'>
              <p>Answer :</p>
              <p>{data?.rightAnswer}</p>
            </Skeleton>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OneQuestionComponent;
