import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import { AiOutlineSend } from "react-icons/ai";

const validate = (values) => {
  const errors = {};
  if (!values.question) {
    errors.question = "Required";
  }
  if (!values.optionA) {
    errors.optionA = "Required";
  }
  if (!values.optionB) {
    errors.optionB = "Required";
  }
  if (!values.optionC) {
    errors.optionC = "Required";
  }
  if (!values.rightAnswer) {
    errors.rightAnswer = "Required";
  }
  return errors;
};

const OneQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitQuestion = (values, resetForm) => {
    console.log(values);
    // setIsLoading(true);
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      rightAnswer: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      submitQuestion(values, resetForm);
    },
  });

  return (
    <div className="mx-3">
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <Text className="font-bold py-2">Question:</Text>
          <Textarea
            placeholder="Type your question here"
            onChange={formik.handleChange}
            value={formik.values.question}
            id="question"
            name="question"
            resize="vertical"
          />
          {formik.errors.question ? (
            <Text fontSize="sm" className="text-red-500">
              {formik.errors.question}
            </Text>
          ) : null}
        </div>
        <div>
          <InputGroup>
            <InputLeftAddon children="A" />
            <Input
              type="text"
              name="optionA"
              id="optionA"
              onChange={formik.handleChange}
              value={formik.values.optionA}
            />
          </InputGroup>
          {formik.errors.optionA ? (
            <Text fontSize="sm" className="text-red-500">
              {formik.errors.optionA}
            </Text>
          ) : null}
        </div>
        <div>
          <InputGroup>
            <InputLeftAddon children="B" />
            <Input
              type="text"
              name="optionB"
              id="optionB"
              onChange={formik.handleChange}
              value={formik.values.optionB}
            />
          </InputGroup>
          {formik.errors.optionB ? (
            <Text fontSize="sm" className="text-red-500">
              {formik.errors.optionB}
            </Text>
          ) : null}
        </div>
        <div>
          <InputGroup>
            <InputLeftAddon children="C" />
            <Input
              type="text"
              name="optionC"
              id="optionC"
              onChange={formik.handleChange}
              value={formik.values.optionC}
            />
          </InputGroup>
          {formik.errors.optionC ? (
            <Text fontSize="sm" className="text-red-500">
              {formik.errors.optionC}
            </Text>
          ) : null}
        </div>
        <div>
          <Text className="font-bold py-2">Answer:</Text>
          <Input
            placeholder="Right Answer"
            type="text"
            name="rightAnswer"
            id="rightAnswer"
            onChange={formik.handleChange}
            value={formik.values.rightAnswer}
          />
          {formik.errors.rightAnswer ? (
            <Text fontSize="sm" className="text-red-500 ">
              {formik.errors.rightAnswer}
            </Text>
          ) : null}
        </div>
        <div>
          <Button
            colorScheme="whatsapp"
            variant="solid"
            fontSize="xl"
            rightIcon={<AiOutlineSend />}
            isFullWidth={true}
            isLoading={isLoading}
            loadingText="Saving"
            spinnerPlacement="end"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OneQuestion;
