// import Head from 'next/head'
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ContentComponent from '../components/home/content.section.component';
import HeroComponent from '../components/home/hero.component';
import Layout from '../components/layout/layout';
import NavHeader from '../components/nav/header.component';
import { useUser } from '../utils/context/userContext';
// import NavHeader from "../components/nav/header.component original";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

export default function Home() {
  if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }

  const router = useRouter();
  const { userDoc } = useUser();

  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='home' desc='Predict and win always'>
      <div className='bg-yellow-300 pb-4'>
        <NavHeader />
        <HeroComponent />
      </div>
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>Admin Page</Heading>
        </div>
        <ContentComponent />
      </div>
    </Layout>
    // <Layout name="home" desc="Predict and win always">
    //   <Container maxW="container.sm" minH="" centerContent border="2px">
    //     <Text m="10">I - Predict</Text>
    //     <Flex
    //       direction="column"
    //       align="center"
    //       justify="center"
    //       border="2px"
    //       w="full"
    //       h="50vh"
    //     >
    //       {/* <div className=""> */}
    //       <Flex w="full" justify="space-around">
    //         <Square size="150px" boxShadow="md" rounded="md" as="div">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //         {/* <Spacer /> */}
    //         <Square size="150px" boxShadow="md" rounded="md" as="div">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //       </Flex>
    //       {/* </div> */}
    //       <Spacer />
    //       <Flex w="full" justify="space-around">
    //         <Square size="150px" boxShadow="md" rounded="md">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //         {/* <Spacer /> */}
    //         <Square size="150px" boxShadow="md" rounded="md">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //       </Flex>
    //       <Spacer />
    //       <Flex w="full" justify="space-around">
    //         <Square size="150px" boxShadow="md" rounded="md">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //         {/* <Spacer /> */}
    //         <Square size="150px" boxShadow="md" rounded="md">
    //           <Box as="div">
    //             <Icon as={GiSoccerBall} w={50} h={50} />
    //           </Box>
    //         </Square>
    //       </Flex>
    //     </Flex>
    //   </Container>
    // </Layout>
  );
}
