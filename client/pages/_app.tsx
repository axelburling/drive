import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
<<<<<<< HEAD
import { FileProvider } from "../context/fileContext";
import { UserProvider } from "../context/userContext";
=======
>>>>>>> 25379cf (starting to build frontend)
// import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
<<<<<<< HEAD
        <FileProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </FileProvider>
=======
        {/* <BrowserRouter> */}
        <Component {...pageProps} />
        {/* </BrowserRouter> */}
>>>>>>> 25379cf (starting to build frontend)
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
