import {
  Box,
  BoxProps,
  Button,
  chakra,
  Flex,
  InputGroup,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { GoPlus } from "react-icons/go";

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: "Home", icon: FiHome },
//   { name: "Trending", icon: FiTrendingUp },
//   { name: "Explore", icon: FiCompass },
//   { name: "Favourites", icon: FiStar },
//   { name: "Settings", icon: FiSettings },
// ];
interface SidebarProps extends BoxProps {
  fileChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Plus = chakra(GoPlus);

export default function SideBar({ fileChange }: SidebarProps) {
  return (
    <Box
      minH="100vh"
      w="1rem"
      bg="blue"
      // bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        fileChange={fileChange}
        // display={{ base: "none", md: "block" }}
      />
    </Box>
  );
}

const SidebarContent = ({ fileChange, ...rest }: SidebarProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.300", "gray.700")}
      w="11rem"
      pos="absolute"
      h="full"
      {...rest}
    >
      <Flex h="10" alignItems="left" marginTop="10px" marginLeft="7px">
        <Menu>
          <MenuButton
            as={Button}
            px={4}
            py={2}
            bg="blue.400"
            transition="all 0.2s"
            w="60%"
            h="80%"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "blue.300" }}
            leftIcon={<Plus />}
            _expanded={{ bg: "blue.700" }}
            _focus={{ boxShadow: "outline" }}
          >
            New
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
            <MenuItem>New Window</MenuItem>
            <MenuDivider />
            <MenuItem>Open...</MenuItem>
            <MenuItem>Save File</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))} */}
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//   return (
//     <Link
//       href="#"
//       style={{ textDecoration: "none" }}
//       _focus={{ boxShadow: "none" }}
//     >
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: "cyan.400",
//           color: "white",
//         }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: "white",
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };
