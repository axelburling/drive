// import { fs, path } from "@tauri-apps/api";
// import "./App.css";

// function App() {
//   (async () => {
//     console.log(await path.appDir());
//     const files = await fs.readDir(await path.appDir());
//   })();

//   return (
//     <div className="App">
//       <h1>hello</h1>
//     </div>
//   );
// }

// export default App;

/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { Auth } from "../api/auth";
// import { FaLock } from "react-icons/fa";
// import { FiMail } from "react-icons/fi";
// import IsLoggedIn from "../components/isLoggedIn";
// import { AuthContext } from "../context/authContext";

// const CFaUserAlt = chakra(FiMail);
// const CFaLock = chakra(FaLock);

const Login = () => {
  // const { login } = useContext(AuthContext)!;
  const { login } = new Auth();
  // const router = useRouter();
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
      if (idk && idk.token && !idk.error) {
        console.log(idk);
        //   router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setPassword("");
    }
    setEmail("");
    setPassword("");
  };

  return (
    // <IsLoggedIn>
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
                    // children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="off"
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
                    // children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="off"
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
    // </IsLoggedIn>
  );
};

export default Login;
