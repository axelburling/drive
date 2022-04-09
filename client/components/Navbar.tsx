import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  InputGroup,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import Logo from "../assets/logo.svg";
import { IUser } from "../types/types";
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ["Profile", "Developer", "Settings"];

const NavLink = ({ path, children }: { path: string; children: ReactNode }) => (
  <Link
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
  </Link>
);

export default function Navbar({
  user,
  logout,
  fileChange,
}: {
  user: IUser | null;
  logout: () => Promise<void>;
  fileChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLInputElement | null>(null);

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
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <IconButton
              aria-label="Home"
              icon={<Image src={Logo.src} />}
              size="md"
              w="30px"
              h="30px"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            />
          )}
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
              {Links.map((link) => (
                <NavLink key={link} path={link}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    user && user.avatar
                      ? user.avatar
                      : "https://bit.ly/sage-avatar"
                  }
                />
              </MenuButton>
              <MenuList>
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

        {/* {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}
