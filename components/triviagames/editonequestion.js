import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { useFormik } from "formik";
import { Formik } from 'formik';
import { AiOutlineSend } from 'react-icons/ai';
// import SubmitQuestions from "../../utils/trivia/submitQuestions";
import { ToastContainer } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
// import SubmitQuestions from "../../utils/trivia/submitQuestions";
import GetOneQuestionFromFirebase from '../../utils/trivia/getOneQuestion';
import UpdateQuestion from '../../utils/trivia/updateQuestion';
import { useQuery } from 'react-query';
// import GetOneQuestionFromFirebase from "../../utils/trivia/getOneQuestion";

// const validate = (values) => {
//   const errors = {};
//   if (!values.question) {
//     errors.question = "Required";
//   }
//   if (!values.optionA) {
//     errors.optionA = "Required";
//   }
//   if (!values.optionB) {
//     errors.optionB = "Required";
//   }
//   if (!values.optionC) {
//     errors.optionC = "Required";
//   }
//   if (!values.rightAnswer) {
//     errors.rightAnswer = "Required";
//   }
//   return errors;
// };

const EditOneQuestion = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { editID } = router.query;
  // const [question, setQuestion] = useState([]);

  const submitQuestion = async (values) => {
    // console.log(values);
    // await SubmitQuestions(values, setIsLoading);
    await UpdateQuestion(values, setIsLoading, editID, value);
    router.push(`/triviagame/questions/${editID}`);
  };

  // const getSpecificQuestion = async () => {
  //   await GetOneQuestionFromFirebase(setQuestion, editID);
  // };

  const { data, isSuccess } = useQuery(
    ['onequestion', editID],
    async () => await GetOneQuestionFromFirebase(editID),
    { enabled: !!editID }
  );
  const [value, setValue] = useState(data?.visible);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setQuestion(data)
  //   }
  // }, [isSuccess]);

  // const formik = useFormik({
  //   initialValues: {
  //     question: `${question?.question}`,
  //     optionA: `${question?.optionA}`,
  //     optionB: `${question?.optionB}`,
  //     optionC: `${question?.optionC}`,
  //     rightAnswer: `${question?.rightAnswer}`,
  //   },
  //   validate,
  //   onSubmit: (values, { resetForm }) => {
  //     submitQuestion(values, resetForm);
  //   },
  // });

  return (
    <div className='mx-3'>
      <Formik
        initialValues={{
          question: `${isSuccess ? data?.question : ''}`,
          optionA: `${isSuccess ? data?.optionA : ''}`,
          optionB: `${isSuccess ? data?.optionB : ''}`,
          optionC: `${isSuccess ? data?.optionC : ''}`,
          rightAnswer: `${isSuccess ? data?.rightAnswer : ''}`,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          submitQuestion(values);
        }}
      >
        {(props) => (
          <form className='space-y-5' onSubmit={props.handleSubmit}>
            <div>
              <Text className='py-2 font-bold'>Question:</Text>
              <Textarea
                placeholder='Type your question here'
                onChange={props.handleChange}
                value={props.values.question}
                id='question'
                name='question'
                resize='vertical'
              />
              {props.errors.question ? (
                <Text fontSize='sm' className='text-red-500'>
                  {props.errors.question}
                </Text>
              ) : null}
            </div>
            <div>
              <InputGroup>
                <InputLeftAddon children='A' />
                <Input
                  type='text'
                  name='optionA'
                  id='optionA'
                  onChange={props.handleChange}
                  value={props.values.optionA}
                />
              </InputGroup>
              {props.errors.optionA ? (
                <Text fontSize='sm' className='text-red-500'>
                  {props.errors.optionA}
                </Text>
              ) : null}
            </div>
            <div>
              <InputGroup>
                <InputLeftAddon children='B' />
                <Input
                  type='text'
                  name='optionB'
                  id='optionB'
                  onChange={props.handleChange}
                  value={props.values.optionB}
                />
              </InputGroup>
              {props.errors.optionB ? (
                <Text fontSize='sm' className='text-red-500'>
                  {props.errors.optionB}
                </Text>
              ) : null}
            </div>
            <div>
              <InputGroup>
                <InputLeftAddon children='C' />
                <Input
                  type='text'
                  name='optionC'
                  id='optionC'
                  onChange={props.handleChange}
                  value={props.values.optionC}
                />
              </InputGroup>
              {props.errors.optionC ? (
                <Text fontSize='sm' className='text-red-500'>
                  {props.errors.optionC}
                </Text>
              ) : null}
            </div>
            <div>
              <Text className='py-2 font-bold'>Answer:</Text>
              <Input
                placeholder='Right Answer'
                type='text'
                name='rightAnswer'
                id='rightAnswer'
                onChange={props.handleChange}
                value={props.values.rightAnswer}
              />
              {props.errors.rightAnswer ? (
                <Text fontSize='sm' className='text-red-500 '>
                  {props.errors.rightAnswer}
                </Text>
              ) : null}
            </div>
            <div>
              <Text className='py-2 font-bold'>Visible:</Text>
              <RadioGroup onChange={setValue} value={value}>
                <Stack>
                  <Radio value='yes'>Yes</Radio>
                  <Radio value='no'>No</Radio>
                </Stack>
              </RadioGroup>
            </div>
            <div className='flex items-center justify-center space-x-2 sm:space-x-4'>
              <Button
                isFullWidth
                colorScheme='teal'
                variant='outline'
                leftIcon={<BiArrowBack />}
                fontSize='xl'
                onClick={() => router.push(`/triviagame/questions/${editID}`)}
              >
                Back
              </Button>
              <Button
                colorScheme='whatsapp'
                variant='solid'
                fontSize='xl'
                rightIcon={<AiOutlineSend />}
                isFullWidth={true}
                isLoading={isLoading}
                loadingText='Saving'
                spinnerPlacement='end'
                type='submit'
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditOneQuestion;
