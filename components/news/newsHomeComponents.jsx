import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AddNewsToFirestore from '../../utils/news/addnewstofirestore';
import RapidNewsApi from '../../utils/news/rapidnewsapi';
import moment from 'moment';

const NewsHomeComponents = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('news', news);
  const { data } = useQuery('newsdata', async () => await RapidNewsApi());

  console.log(
    moment('2022-02-02T20:02:02+00:00').format('MMMM Do YYYY, h:mm:ss a')
  );

  console.log('component data :>> ', data?.data);
  // const aa = data?.data;
  // if (data?.data) {
  //   console.log('object spread :>> ', { ...aa[0] });
  // }

  const handleNews = async () => {
    if (news) {
      await AddNewsToFirestore(news, setLoading);
    }
  };

  useEffect(() => {
    // let newArr = [];
    // if (data?.data) {
    // data?.forEach((doc) => newArr.push(doc.data()));
    // newArr = data?.data;
    setNews(data?.data[2]);
    // }
  }, [data]);

  const danger = {
    __html: `<p>It's officially a World Cup year, that means footballers all over the globe will be hoping to get themselves into contention for their own shot at glory in Qatar.</p>`,
  };

  return (
    <div className='flex flex-col'>
      <Button isLoading={loading} loadingText='Sending' onClick={handleNews}>
        Send News to firestore
      </Button>
      <div className='flex'>
        <div dangerouslySetInnerHTML={danger} />
      </div>
      <p>soft</p>
      <p>it must refresh</p>
      <p>it must refresh</p>
      <p>it must refresh</p>
    </div>
  );
};

export default NewsHomeComponents;
