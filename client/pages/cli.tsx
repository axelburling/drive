/* eslint-disable react/no-children-prop */

import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Cli as C } from "../api/cli";
import { AuthContext } from "../context/authContext";

const CFaUserAlt = chakra(FiMail);
const CFaLock = chakra(FaLock);

const Cli = () => {
  const { login } = useContext(AuthContext)!;
  const cli = new C();
  const toast = useToast();
  const router = useRouter();
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // console.log(e);
    e.preventDefault();
    console.log("submit");
    console.log(email, password);
    try {
      const idk = await login({ email, password });
      if (
        idk &&
        idk.token &&
        !idk.error &&
        token &&
        typeof token === "string"
      ) {
        console.log(idk);
        console.log(token);
        try {
          const res = await cli.send({ token, user: idk.user });
          console.log(res);
          if (res && !res.error) {
            toast({
              title: "Success",
              description:
                "You have successfully logged in to the CLI, Please check your terminal to continue",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            router.push("/dashboard");
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong when logging in",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="lg"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    variant="outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleClick}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Cli;
