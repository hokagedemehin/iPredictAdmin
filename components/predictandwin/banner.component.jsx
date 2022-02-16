// import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  // ButtonGroup,
  // Editable,
  // EditableInput,
  // EditablePreview,
  // Flex,
  // FormControl,
  // Heading,
  // IconButton,
  Input,
  Skeleton,
  Text,
  // useEditableControls,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BannerUpdate from '../../utils/matches/banner/bannerUpdate';
import GetBanner from '../../utils/matches/banner/getBanner';

const BannerPredictAndWin = () => {
  const [formValue, setFormValue] = useState({});
  const [buttonLoad, setButtonLoad] = useState(false);
  // const [bannerData, setBannerData] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  // console.log(formValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValue);
    await BannerUpdate(formValue, setButtonLoad);
  };

  const { isLoading, data, isSuccess } = useQuery(
    'prize-people',
    async () => await GetBanner()
  );

  return (
    <div>
      <div className='mx-auto mb-10 flex max-w-sm flex-col space-y-2 rounded-lg bg-gradient-to-r from-purple-700 to-blue-600 px-5  py-5 text-white shadow-md sm:px-10'>
        <Text className='font-semibold'>This week prize winning</Text>
        <Box className='flex space-x-3'>
          {isLoading && (
            <Skeleton className='h-10 w-full'>Input Value</Skeleton>
          )}
          {isSuccess && (
            <Input
              defaultValue={data.prize}
              name='prize'
              onChange={(e) => handleChange(e)}
            />
          )}
          {/* <Button colorScheme='teal' onSubmit={(e) => handleSubmit(e)}>
            Change
          </Button> */}
        </Box>

        <Text className='font-semibold'>Number of people</Text>
        <Box className='space-y-3'>
          {isLoading && (
            <Skeleton className='h-10 w-full'>Input Value</Skeleton>
          )}
          {isSuccess && (
            <Input
              defaultValue={data.people}
              name='people'
              onChange={(e) => handleChange(e)}
            />
          )}
          <Button
            colorScheme='teal'
            onClick={(e) => handleSubmit(e)}
            isLoading={buttonLoad}
            loadingText='Changing'
          >
            Change
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default BannerPredictAndWin;

/**
 * function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton
          colorScheme='teal'
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          colorScheme='teal'
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          colorScheme='teal'
          size='sm'
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }


 * <Heading>
          <Editable
            textAlign='center'
            defaultValue='10'
            fontSize='2xl'
            isPreviewFocusable={false}
            onSubmit={(e) => handleSubmit(e)}
          >
            <EditablePreview />
            <EditableInput />
            <EditableControls />
          </Editable>
        </Heading>
 */
