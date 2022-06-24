import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  InputGroup,
  Link as Lin,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Logo from "../assets/logo.svg";
import { AuthContext } from "../context/authContext";
import Searchbar from "./searchbar";

// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ["Avatar", "Developer"];

const DarkModeIcon = chakra(MdDarkMode);
const LightModeIcon = chakra(MdLightMode);

const NavLink = ({ path, children }: { path: string; children: ReactNode }) => (
  <Lin
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={`/${path.toLowerCase()}`}
  >
    {children}
  </Lin>
);

export default function Navbar({
  onSearch,
  fileChange,
}: {
  onSearch?: (query: string) => void;
  fileChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}) {
  const {
    user: [user],
    logout,
  } = useContext(AuthContext)!;
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleColorMode();
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (localStorage.getItem("checked")) {
      setIsChecked(
        localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false
      );
    }
  }, []);

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.300", "gray.700")}
        p="0"
        // marginBottom="10"
        w="100%"
        h="70px"
        position="sticky"
        top="0"
        // px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {fileChange ? (
            <Menu size="sm">
              <MenuButton
                as={IconButton}
                marginLeft={2}
                icon={<Image src={Logo.src} />}
                size={"md"}
                w="30px"
                h="40px"
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <InputGroup
                    onClick={() => {
                      ref.current?.click();
                    }}
                  >
                    <input
                      type="file"
                      name="file"
                      id=""
                      multiple={true}
                      onChange={fileChange}
                      hidden={true}
                      ref={(e) => {
                        ref.current = e;
                      }}
                    />
                    <>File Upload</>
                  </InputGroup>
                </MenuItem>
                <MenuItem>
                  <Link href="/shared">Shared With Me</Link>
                </MenuItem>
                {/* <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem> */}
              </MenuList>
            </Menu>
          ) : (
            <IconButton
              aria-label="Home"
              marginLeft={2}
              icon={<Image src={Logo.src} />}
              size="md"
              w="30px"
              h="30px"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            />
          )}
          {onSearch ? <Searchbar onChange={(e) => onSearch(e)} /> : null}
          {/* <IconButton
            size={"md"}
            w="30px"
            h="40px"
            icon={<Image src={Logo.src} alt="Logo" />}
            aria-label={"Open Menu"}
            // display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {onSearch
                ? null
                : Links.map((link) => (
                    <NavLink key={link} path={link}>
                      {link}
                    </NavLink>
                  ))}
              <LightModeIcon />
              <Switch
                size="md"
                isChecked={isChecked}
                onChange={(e) => onChangeMode(e)}
              ></Switch>
              <DarkModeIcon />
            </HStack>
          </HStack>
          <Flex alignItems={"center"} zIndex={10000000}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  marginRight={1}
                  src={user && user.avatar ? user.avatar : undefined}
                />
              </MenuButton>
              <MenuList zIndex={100}>
                {Links.map((link) => (
                  <MenuItem key={link}>
                    <a href={`/${link.toLowerCase()}`}>{link}</a>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
