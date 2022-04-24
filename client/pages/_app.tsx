import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { FileProvider } from "../context/fileContext";
import { UserProvider } from "../context/userContext";
// import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <FileProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </FileProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
