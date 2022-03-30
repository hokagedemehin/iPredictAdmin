import {
  Button,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import AddNewsToFirestore from '../../utils/news/addnewstofirestore';
import RapidNewsApi from '../../utils/news/rapidnewsapi';
import { FiDownloadCloud, FiUploadCloud } from 'react-icons/fi';
// import moment from 'moment';
import ClockLoader from 'react-spinners/ClockLoader';
import HashLoader from 'react-spinners/HashLoader';
import NewsFeedComponent from './apiData/newsfeed.component';
import DatabaseFeedComponent from './databaseData/databasefeed.component';
import GetNewsFirestore from '../../utils/news/getNewsFirestore';
import UploadNewsToFirestore from '../../utils/news/uploadNewsToFirestore';

const NewsHomeComponents = () => {
  const [formValue, setFormValue] = useState({});

  const [news, setNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]);
  const [transferNews, setTransferNews] = useState([]);
  const [uefaNews, setUefaNews] = useState([]);
  // const [newsDatabase, setNewsDatabase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);

  // console.log('news', news);

  // const { data } = useQuery('newsdata', async () => await RapidNewsApi());
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const subCollection =
      value == '2021020913320920836'
        ? 'football'
        : value == '2022010516022274132'
        ? 'transfers'
        : 'uefa';
    setFormValue({ ...formValue, [name]: value, section: subCollection });
  };

  // console.log(
  //   moment('2022-02-02T20:02:02+00:00').format('MMMM Do YYYY, h:mm:ss a')
  // );

  // console.log('component data :>> ', data?.data);
  // const aa = data?.data;
  // if (data?.data) {
  //   console.log('object spread :>> ', { ...aa[0] });
  // }

  const handleNews = async (e) => {
    e.preventDefault();
    const data = await RapidNewsApi(formValue, setLoading);
    if (data) {
      const newData = data.data.sort((a, b) => {
        return b.id - a.id;
      });
      setNews(newData);
    }
  };

  const handleFirestore = async (e) => {
    e.preventDefault();
    await UploadNewsToFirestore(news, formValue?.section, setIsLoadings);
    // if (data) {
    //   const newData = data.data.sort((a, b) => {
    //     return b.id - a.id;
    //   });
    //   setNewsDatabase(newData);
    // }
  };

  const {
    isLoading: databaseLoading,
    data: databaseData,
    isSuccess,
    dataUpdatedAt,
  } = useQuery('getNewsFromFirestore', async () => await GetNewsFirestore());

  // console.log('databaseData :>> ', databaseData);

  useEffect(() => {
    let newArr1 = [];
    let newArr2 = [];
    let newArr3 = [];

    if (
      isSuccess &&
      typeof (databaseData !== null) &&
      Object?.keys(databaseData).length !== 0
    ) {
      // console.log('data succesfull');
      // databaseData.forEach((doc) => newArr.push(doc.data()));
      databaseData.football.forEach((doc) => newArr1.push(doc.data()));
      setFootballNews(newArr1);
      databaseData.transfer.forEach((doc) => newArr2.push(doc.data()));
      setTransferNews(newArr2);
      databaseData.uefa.forEach((doc) => newArr3.push(doc.data()));
      setUefaNews(newArr3);
    }
  }, [isSuccess, dataUpdatedAt, databaseData]);

  return (
    <div className='mx-4 flex flex-col space-y-4'>
      <div className='header mx-4 w-full'>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <div className='flex items-center justify-center'>
            <Select
              name='newSection'
              id='newSection'
              placeholder='Select news'
              onChange={(e) => handleChange(e)}
            >
              <option value='2021020913320920836'>Football</option>
              <option value='2022010516022274132'>Transfers</option>
              <option value='2021082315501532387'>UEFA Champions League</option>
            </Select>
          </div>
          <div className='flex space-x-4'>
            <Button
              colorScheme='teal'
              variant='outline'
              leftIcon={<FiDownloadCloud />}
              isLoading={loading}
              loadingText='Fetching'
              onClick={(e) => handleNews(e)}
              spinner={<ClockLoader size={20} />}
            >
              Get News
            </Button>
            <Button
              colorScheme='teal'
              variant='solid'
              leftIcon={<FiUploadCloud />}
              isLoading={isLoadings}
              loadingText='Saving'
              onClick={(e) => handleFirestore(e)}
              spinner={<HashLoader size={20} />}
            >
              Update Database
            </Button>
          </div>
        </div>
      </div>
      <div className='tab-section'>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              Database Update
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>New Feed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DatabaseFeedComponent
                isSuccess={isSuccess}
                databaseLoading={databaseLoading}
                footballNews={footballNews}
                transferNews={transferNews}
                uefaNews={uefaNews}
              />
            </TabPanel>
            <TabPanel>
              <div className='space-y-3'>
                {news.length !== 0 &&
                  news.map((elem, index) => (
                    <NewsFeedComponent key={index} elem={elem} />
                  ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default NewsHomeComponents;

/**
 * <div className="flex flex-col">
      <Button
        // isLoading={loading}
        loadingText="Sending"
        onClick={() => handleNews()}
      >
        Send News to firestore
      </Button>
      <div className="flex">
        <div dangerouslySetInnerHTML={danger} />
      </div>
      <p>soft</p>
      <p>it must refresh</p>
      <p>it must refresh</p>
      <p>it must refresh</p>
    </div>
 */
