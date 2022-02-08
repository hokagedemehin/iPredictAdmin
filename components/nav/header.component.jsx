import React from "react";
import {
  Flex,
  // Box,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
// import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

import {
  GiSoccerBall,
  GiCardPlay,
  GiWallet,
  GiNewspaper,
  GiCartwheel,
} from "react-icons/gi";
import { BsNewspaper, BsFileSpreadsheetFill } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";
import { useUser } from "../../utils/context/userContext";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const NavHeader = () => {
  const router = useRouter();
  const { user } = useUser();
  // const [navName, setNavName] = useState('');
  // console.log('navname', navName);
  const handleLogout = async () => {
    // e.preventDefault();
    await signOut(auth);
    router.push("/");
  };
  const handleClick = (e, href) => {
    e.preventDefault();
    // console.log('e :>> ', e);
    // setNavName(e.target.dataset.name);
    router.push(href);
  };
  return (
    <div className="relative">
      <Flex px="4" py="2" className="">
        <div className="sm:hidden">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                data-name="Home"
                icon={<AiOutlineHome />}
                onClick={(e) => handleClick(e, "/")}
              >
                Home
              </MenuItem>
              <MenuItem
                data-name="Predict & Win"
                icon={<GiSoccerBall />}
                onClick={(e) => handleClick(e, "/predictandwin")}
              >
                Predict & Win
              </MenuItem>
              <MenuItem
                data-name="My Predictions"
                icon={<BsFileSpreadsheetFill />}
                onClick={(e) => handleClick(e, "/showprediction")}
              >
                All Predictions
              </MenuItem>
              <MenuItem
                data-name="News & Transfers"
                icon={<GiNewspaper />}
                onClick={(e) => handleClick(e, "/news")}
              >
                News & Transfers
              </MenuItem>
              <MenuItem
                data-name="Team Cards"
                icon={<GiCardPlay />}
                onClick={(e) => handleClick(e, "/teamcard")}
              >
                Team Cards
              </MenuItem>
              <MenuItem
                data-name="Trivia Game"
                icon={<MdOutlineQuiz />}
                onClick={(e) => handleClick(e, "/triviagame")}
              >
                Trivia Game
              </MenuItem>
              <MenuItem
                data-name="Trivia Attempts"
                icon={<BsFileSpreadsheetFill />}
                onClick={(e) => handleClick(e, "/triviaattempts")}
              >
                Trivia Attempts
              </MenuItem>
              <MenuItem
                data-name="Spin Match Virtual"
                icon={<GiCartwheel />}
                onClick={(e) => handleClick(e, "/spinmatch")}
              >
                Spin Match Virtual
              </MenuItem>
              <MenuItem
                data-name="News Magazine"
                icon={<BsNewspaper />}
                onClick={(e) => handleClick(e, "/magazine")}
              >
                News Magazine
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="hidden w-full max-w-2xl sm:flex">
          <nav className="flex w-full items-center justify-around">
            <Button variant="ghost" onClick={(e) => handleClick(e, "/")}>
              Home
            </Button>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant="ghost"
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Predict
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-name="Predict & Win"
                      icon={<GiSoccerBall />}
                      onClick={(e) => handleClick(e, "/predictandwin")}
                    >
                      Predict & Win
                    </MenuItem>
                    <MenuItem
                      data-name="My Predictions"
                      icon={<BsFileSpreadsheetFill />}
                      onClick={(e) => handleClick(e, "/showprediction")}
                    >
                      All Predictions
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant="ghost"
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    News
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-name="News & Transfers"
                      icon={<GiNewspaper />}
                      onClick={(e) => handleClick(e, "/news")}
                    >
                      News & Transfers
                    </MenuItem>
                    <MenuItem
                      data-name="News Magazine"
                      icon={<BsNewspaper />}
                      onClick={(e) => handleClick(e, "/magazine")}
                    >
                      News Magazine
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant="ghost"
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Trivia
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-name="Trivia Game"
                      icon={<MdOutlineQuiz />}
                      onClick={(e) => handleClick(e, "/triviagame")}
                    >
                      Trivia Game
                    </MenuItem>
                    <MenuItem
                      data-name="Trivia Attempts"
                      icon={<BsFileSpreadsheetFill />}
                      onClick={(e) => handleClick(e, "/triviaattempts")}
                    >
                      Trivia Attempts
                    </MenuItem>
                    <MenuItem
                      data-name="Spin Match Virtual"
                      icon={<GiCartwheel />}
                      onClick={(e) => handleClick(e, "/spinmatch")}
                    >
                      Spin Match Virtual
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant="ghost"
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Cards
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-name="Team Cards"
                      icon={<GiCardPlay />}
                      onClick={(e) => handleClick(e, "/teamcard")}
                    >
                      Team Cards
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </nav>
        </div>
        <Spacer />
        {user ? (
          <div className="flex items-center justify-between space-x-2 sm:space-x-5">
            {/* wallet */}
            <div className="flex">
              <IconButton
                colorScheme="facebook"
                variant="outline"
                isRound={true}
                aria-label="wallet page"
                icon={<GiWallet />}
                onClick={(e) => handleClick(e, "/wallet")}
                fontSize="lg"
                data-cy-name="wallet"
              />
            </div>
            {/* profile */}
            <Menu>
              <MenuButton
                cursor="pointer"
                data-cy-name="profileBtn"
                _hover={{
                  background: "gray.200",
                }}
                p="2"
                rounded="full"
                as="button"
              >
                <Image
                  className="h-8 w-8 rounded-full"
                  data-cy-name="profile image"
                  src="https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100"
                  alt="user's profile"
                  fallbackSrc="https://via.placeholder.com/30?text=user"
                  borderRadius="md"
                  // boxSize='200px'
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  data-cy-name="profilePage"
                  icon={<FaUser />}
                  onClick={(e) => handleClick(e, "/profile")}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  data-cy-name="logOut"
                  icon={<GoSignOut />}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Button
            rightIcon={<RiLoginCircleLine />}
            variant="ghost"
            onClick={(e) => handleClick(e, "/login")}
          >
            Login
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default NavHeader;
