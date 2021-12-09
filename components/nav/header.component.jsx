import React, { useRef } from "react";
import {
  Flex,
  Box,
  Input,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import {
  AddIcon,
  BellIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from "react-icons/gi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

const NavHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  return (
    <>
      <Flex px="4" py="2">
        {/* <IconButton
          aria-label="Nav Button"
          // colorScheme="white"
          icon={<HamburgerIcon boxSize="7" />}
          ref={btnRef}
          onClick={onOpen}
          as="button"
        /> */}
        {/* <Box
          cursor="pointer"
          _hover={{
            background: "gray.200",
          }}
          p="1"
          rounded="md"
          ref={btnRef}
          onClick={onOpen}
          as="button"
        >
          <HamburgerIcon boxSize="7" />
        </Box> */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AiOutlineHome />} onClick={() => router.push("/")}>
              Home
            </MenuItem>
            <MenuItem
              icon={<GiSoccerBall />}
              onClick={() => router.push("/predictandwin")}
            >
              Predict & Win
            </MenuItem>
            <MenuItem
              icon={<GiNewspaper />}
              onClick={() => router.push("/news")}
            >
              News & Transfers
            </MenuItem>
            <MenuItem
              icon={<GiCardPlay />}
              onClick={() => router.push("/teamcard")}
            >
              Team Cards
            </MenuItem>
            <MenuItem
              icon={<MdOutlineQuiz />}
              onClick={() => router.push("/trivisgame")}
            >
              Trivis Game
            </MenuItem>
            <MenuItem
              icon={<GiCartwheel />}
              onClick={() => router.push("/spinmatch")}
            >
              Spin Match Virtual
            </MenuItem>
            <MenuItem
              icon={<BsNewspaper />}
              onClick={() => router.push("/magazine")}
            >
              News Magazine
            </MenuItem>
          </MenuList>
        </Menu>
        <Spacer />

        <Box
          cursor="pointer"
          _hover={{
            background: "gray.200",
          }}
          p="1"
          rounded="md"
          as="button"
        >
          <BellIcon boxSize="7" />
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div
              className="text-2xl font-bold cursor-pointer"
              onClick={() => router.push("/")}
            >
              I-Predict
            </div>
          </DrawerHeader>

          <DrawerBody>
            {/* <Text> Nav Content comes here</Text> */}
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spaceing={4}
              align-="stretch"
            >
              <Button
                onClick={() => router.push("/predictandwin")}
                // w="100%"
                isFullWidth
                rightIcon={<GiSoccerBall />}
              >
                {" "}
                Predict & Win
              </Button>
              <Button
                onClick={() => router.push("/news")}
                // w="100%"
                isFullWidth
                rightIcon={<GiNewspaper />}
              >
                {" "}
                News & Transfer
              </Button>
              <Button
                onClick={() => router.push("/teamcard")}
                // w="100%"
                isFullWidth
                rightIcon={<GiCardPlay />}
              >
                {" "}
                Team Card
              </Button>
              <Button
                onClick={() => router.push("/trivisgame")}
                // w="100%"
                isFullWidth
                rightIcon={<MdOutlineQuiz />}
              >
                {" "}
                Trivis Game
              </Button>
              <Button
                onClick={() => router.push("/spinmatch")}
                // w="100%"
                isFullWidth
                rightIcon={<GiCartwheel />}
              >
                {" "}
                Spin Match Virtual
              </Button>
              <Button
                onClick={() => router.push("/magazine")}
                // w="100%"
                isFullWidth
                rightIcon={<BsNewspaper />}
              >
                {" "}
                News Magazine
              </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button colorScheme="facebook" mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
              Twitter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavHeader;
