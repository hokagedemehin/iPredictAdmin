// import Head from 'next/head'
import {
  Box,
  Flex,
  Text,
  Spacer,
  Input,
  Icon,
  Heading,
  Button,
  Square,
  Circle,
  Center,
  Container,
} from "@chakra-ui/react";
import ContentComponent from "../components/home/content.section.component";
import HeroComponent from "../components/home/hero.component";
import Layout from "../components/layout/layout";
import NavHeader from "../components/nav/header.component";

export default function Home() {
  return (
    <Layout name="home" desc="Predict and win always">
      <div className="bg-yellow-300 pb-4">
        <NavHeader />
        <HeroComponent />
      </div>
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
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
