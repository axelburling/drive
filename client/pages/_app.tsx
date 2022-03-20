import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
// import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        {/* <BrowserRouter> */}
        <Component {...pageProps} />
        {/* </BrowserRouter> */}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
